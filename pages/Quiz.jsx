import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const router = useRouter();

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getAllQuiz`);
        setQuizzes(response.data);
        setFilteredQuizzes(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    let filtered = quizzes;

    if (departmentFilter) {
      filtered = filtered.filter(
        (q) =>
          q.department &&
          q.department.toLowerCase() === departmentFilter.toLowerCase()
      );
    }

    if (levelFilter) {
      filtered = filtered.filter(
        (q) => q.level && q.level.toString() === levelFilter.toString()
      );
    }

    setFilteredQuizzes(filtered);
  }, [departmentFilter, levelFilter, quizzes]);

  // Unique departments and levels for filters
  const departments = Array.from(
    new Set(quizzes.map((q) => q.department).filter(Boolean))
  );

  const levels = Array.from(
    new Set(quizzes.map((q) => q.level).filter(Boolean))
  ).sort();

  return (
    <Layout>
      <div className="min-h-screen text-black max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">
          Available Quizzes
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center">
          {/* Department Filter */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="departmentFilter"
              className="mb-2 font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="departmentFilter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Departments</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="levelFilter"
              className="mb-2 font-medium text-gray-700"
            >
              Level
            </label>
            <select
              id="levelFilter"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Levels</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading, Error, Empty */}
        {loading && (
          <p className="text-center text-gray-600">Loading quizzes...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">Error: {error}</p>
        )}

        {!loading && !error && filteredQuizzes.length === 0 && (
          <p className="text-center text-gray-600">No quizzes found.</p>
        )}

        {/* Quiz List */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {quiz.title}
                </h2>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Course:</strong> {quiz.course || "N/A"}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Department:</strong> {quiz.department || "N/A"}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Level:</strong> {quiz.level || "N/A"}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  <strong>Questions:</strong>{" "}
                  {quiz.questionsCount ?? quiz.questions?.length ?? "?"}{" "}
                  &nbsp;|&nbsp; <strong>Duration:{quiz.duration}</strong>{" "}
                  {quiz.duration || "N/A"}
                </p>
              </div>

              <button
                onClick={() => router.push(`/quiz/${quiz._id}`)}
                className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-5 py-2 shadow-sm transition duration-300"
                aria-label={`Start quiz ${quiz.title}`}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
