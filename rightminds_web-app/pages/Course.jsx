import Layout from "@/components/Layout";
import React from "react";
import { useState } from "react";
const availableCourses = [
  { id: 1, name: "Biochemistry" },
  { id: 2, name: "Organic Chemistry" },
  { id: 3, name: "Molecular Biology" },
  { id: 4, name: "Physics" },
  { id: 5, name: "Mathematics" },
];

const Course = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle course selection
  const handleCourseSelect = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId)); // Deselect course
    } else {
      setSelectedCourses([...selectedCourses, courseId]); // Select course
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedCourses.length === 0) {
      setErrorMessage("Please select at least one course.");
      return;
    }

    // In real application, submit selectedCourses to backend here
    console.log("Selected courses:", selectedCourses);
  };
  return (
    <div>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
              Select Your Courses
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
              <div className="space-y-4">
                {availableCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <label
                      htmlFor={`course-${course.id}`}
                      className="text-lg text-gray-700 font-medium"
                    >
                      {course.name}
                    </label>
                    <input
                      type="checkbox"
                      id={`course-${course.id}`}
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleCourseSelect(course.id)}
                      className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              {errorMessage && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Selected Courses
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Course;
