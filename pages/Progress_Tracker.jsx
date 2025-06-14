import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProgressPage() {
  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempts, setSelectedAttempts] = useState(null);
  const { data: session, status } = useSession();

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  useEffect(() => {
    const fetchProgress = async () => {
      if (status !== "authenticated" || !session) return;

      try {
        const res = await fetch(
          `${BACKENDURL}/api/progress/${session.user.id}`
        );
        const data = await res.json();
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

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((acc, cur) => acc + cur.progress, 0) / courses.length
        )
      : 0;

  const StatusBadge = ({ status }) => {
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
  };

  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const CourseCard = ({ course }) => {
    const latestScore =
      course.attempts?.[course.attempts.length - 1]?.score ?? null;

    return (
      <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {course.title}
          </h2>
          <StatusBadge status={course.status} />
        </div>

        <ProgressBar value={course.progress} />
        <p className="text-sm text-gray-500">{course.progress}% completed</p>

        {latestScore !== null && (
          <p className="text-sm text-blue-700 font-medium">
            Score: {latestScore}%
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          {course.status !== "Completed" && (
            <Link href={`/courses/${course.quizId}`}>
              <span className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Continue
              </span>
            </Link>
          )}

          {course.attempts?.length > 0 && (
            <button
              onClick={() => setSelectedAttempts(course)}
              className="inline-block px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              View Attempts
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen text-black bg-white px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Course Progress</h1>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-lg capitalize font-semibold text-blue-900">
                Welcome, {session?.user?.firstname}
              </h2>
              <p className="text-sm text-blue-800">
                Keep pushing, you're doing great!
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Scholar Badge
                </span>
                <span className="text-xs text-blue-900">
                  {courses.length} Courses |{" "}
                  {courses.filter((c) => c.status === "Completed").length}{" "}
                  Completed
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-blue-300 rounded-full">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-800">
                  {averageProgress}%
                </div>
                <div className="text-[10px] text-blue-600">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-6">
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
                <CourseCard key={course.quizId} course={course} />
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

      {/* Modal */}
      {selectedAttempts && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <h3 className="text-lg font-semibold mb-4">
              Attempts - {selectedAttempts.title}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedAttempts.attempts.map((a, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{a.score}%</td>
                    <td className="py-2">{formatDate(a.finishTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedAttempts(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
