import React from "react";

const EnrolledCourseCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  w-full">
      {/* Image */}
      <div className="relative mb-4">
        <img
          src="https://via.placeholder.com/300x200"
          alt="Course Image"
          className="rounded-lg w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-lg">
          In Progress
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Course Title</h3>

      {/* Course Description */}
      <p className="text-sm text-gray-600 mb-4">
        A brief description of what this course covers and how it can help you.
        It's a great choice for improving your skills.
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-600 mb-1">Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition duration-300">
          Continue
        </button>
        <button className="text-gray-500 text-sm hover:underline">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
