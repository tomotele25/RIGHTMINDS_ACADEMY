import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";

function StatusBadge({ status }) {
  const colorMap = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${
        colorMap[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function Card({ course }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
        <StatusBadge status={course.status} />
      </div>

      <ProgressBar value={course.progress} />
      <p className="text-sm text-gray-500">{course.progress}% completed</p>

      {course.status !== "Completed" && (
        <Link href={`/courses/${course.quizId}`}>
          <span className="inline-block px-4 mt-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Continue
          </span>
        </Link>
      )}
    </div>
  );
}

export default function ProgressPage() {
  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";
  useEffect(() => {
    const fetchProgress = async () => {
      if (status !== "authenticated" || !session) return;

      console.log("Fetching for studentId:", session.user.id);

      try {
        const res = await fetch(
          `${BACKENDURL}/api/progress/${session.user.id}`
        );
        const data = await res.json();
        console.log("Progress data:", data);
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [status, session]);

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.status === filter);

  if (status === "loading") {
    return (
      <Layout>
        <div className="text-center py-10 text-gray-500">
          Loading session...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Course Progress</h1>

          <div className="flex gap-3 flex-wrap">
            {["All", "In Progress", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  filter === status
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-gray-500">Loading progress...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredCourses.map((course) => (
                <Card key={course.quizId} course={course} />
              ))}

              {filteredCourses.length === 0 && (
                <p className="text-gray-500 text-sm col-span-full">
                  No courses found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
