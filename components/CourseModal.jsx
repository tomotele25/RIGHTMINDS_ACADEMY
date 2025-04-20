import React from "react";

const CourseModal = ({ heading, sub_heading, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 sm:w-1/2 lg:w-1/3 transform transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-black">{heading}</h2>
        <p className="text-md text-gray-700 mt-2">{sub_heading}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CourseModal;
