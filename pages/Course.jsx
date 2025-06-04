import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Course = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideos, setShowVideos] = useState(false);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/getCourses`);
      if (response.data?.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/departments`);
      setDepartments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  // Fetch levels from backend
  const fetchLevels = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/levels`);
      setLevels(response.data || []);
    } catch (error) {
      console.error("Failed to fetch levels", error);
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    fetchLevels();
  }, []);

  // Filter courses based on selections and type
  const filteredCourses = courses.filter((course) => {
    if (showVideos && course.type !== "video") return false;
    if (!showVideos && course.type !== "pdf") return false;

    if (
      selectedDepartment !== "All Departments" &&
      course.department !== selectedDepartment
    ) {
      return false;
    }

    if (selectedLevel !== "All Levels" && course.level !== selectedLevel) {
      return false;
    }

    return true;
  });

  return (
    <Layout>
      <div>
        <h1 className="text-black font-semibold text-center md:text-2xl">
          Explore course materials (PDFs & videos) curated by your department
          and level.
        </h1>

        {/* Filter Area */}
        <div className="pt-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 px-4 md:px-10 bg-white shadow-sm rounded-md p-5">
            {/* Department Filter */}
            <div className="flex-1 grid gap-2">
              <label className="text-sm font-medium text-black">
                Department
              </label>
              <select
                className="text-black px-4 py-2 border rounded-lg border-gray-300"
                onChange={(e) => setSelectedDepartment(e.target.value)}
                value={selectedDepartment}
              >
                <option value="All Departments">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept._id || dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex-1 grid gap-2">
              <label className="text-sm font-medium text-black">Level</label>
              <select
                className="text-black px-4 py-2 border rounded-lg border-gray-300"
                onChange={(e) => setSelectedLevel(e.target.value)}
                value={selectedLevel}
              >
                <option value="All Levels">All Levels</option>
                {levels.map((level) => (
                  <option
                    key={level._id || level.id}
                    value={level.name || level.level}
                  >
                    {level.name || `${level.level}lvl`}
                  </option>
                ))}
              </select>
            </div>

            {/* Search input (still static, you can add search logic later) */}
            <div className="flex-1 grid gap-2">
              <label className="text-sm font-medium text-black">Search</label>
              <input
                type="text"
                placeholder="e.g. Data Structures"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Toggle PDF/Video */}
        <div className="flex gap-4 justify-center pt-6">
          <button
            onClick={() => setShowVideos(false)}
            className={`px-4 py-2 text-lg font-medium ${
              !showVideos ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            PDF Courses
          </button>
          <button
            onClick={() => setShowVideos(true)}
            className={`px-4 py-2 text-lg font-medium ${
              showVideos ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            Video Courses
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10 px-4 md:px-10">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white hover:shadow-2xl transition duration-300 shadow p-5 rounded-lg flex flex-col justify-between"
            >
              <img
                src={course.image}
                alt={course.title}
                loading="lazy"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-black line-clamp-2">
                  {course.title}
                </h1>
                <p className="text-slate-700 text-sm line-clamp-2">
                  {course.description || "No description available"}
                </p>
                <p className="text-slate-700 text-sm font-medium">
                  {course.department} / {course.level} Level
                </p>
                <p className="text-gray-500 text-sm">
                  Instructor: {course.instructor}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Link
                  href={
                    showVideos
                      ? course.videoUrl
                      : `/PDFReader?pdfUrl=${encodeURIComponent(course.pdfUrl)}`
                  }
                  className="bg-blue-700 p-3 justify-center text-white flex items-center text-sm text-center rounded-lg w-full hover:bg-blue-800 transition"
                >
                  View Course
                </Link>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="bg-gray-200 p-2 text-nowrap text-gray-800 text-sm rounded-lg hover:bg-gray-300 transition"
                >
                  View Overview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Overview Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold text-black mb-2">
                {selectedCourse.title}
              </h2>
              <p className="text-sm text-slate-700 mb-1">
                <strong>Department:</strong> {selectedCourse.department}
              </p>
              <p className="text-sm text-slate-700 mb-1">
                <strong>Level:</strong> {selectedCourse.level}
              </p>
              <p className="text-sm text-slate-700 mb-1">
                <strong>Instructor:</strong> {selectedCourse.instructor}
              </p>
              <p className="text-sm text-gray-800 mt-2">
                {selectedCourse.description}
              </p>
              <button
                onClick={() => setSelectedCourse(null)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Course;
