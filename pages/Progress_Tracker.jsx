"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

// Badge Component
function StatusBadge({ status }) {
  const colorMap = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}

// Progress Bar Component
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

// Card Component
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
        <Link href={`/courses/${course.id}`}>
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

  const courses = [
    { id: 1, title: "JavaScript Basics", status: "In Progress", progress: 45 },
    { id: 2, title: "HTML & CSS", status: "Completed", progress: 100 },
    { id: 3, title: "React Essentials", status: "In Progress", progress: 70 },
  ];

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.status === filter);

  return (
    <Layout>
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Course Progress</h1>

          {/* Filter Buttons */}
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

          {/* Filtered Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} course={course} />
            ))}

            {filteredCourses.length === 0 && (
              <p className="text-gray-500 text-sm col-span-full">
                No courses found.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
