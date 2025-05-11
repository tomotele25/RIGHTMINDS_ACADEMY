import axios from "axios";
import React, { useState } from "react";

const CreateTeacherModal = ({ onClose }) => {
  const [teacherDetails, setTeacherDetails] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    contact: "",
  });
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: teacherDetails.username,
      email: teacherDetails.email,
      password: teacherDetails.password,
      firstname: teacherDetails.firstName,
      lastname: teacherDetails.lastName,
      contact: teacherDetails.contact,
    };

    try {
      const response = await axios.post(
        `${BACKENDURL}/api/createteachers`,
        payload
      );
      console.log("response from backend:", response);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("error from the backend:", error);
    }
    console.log("Teacher details:", teacherDetails);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-center text-gray-800">
          Create Teacher
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={teacherDetails.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={teacherDetails.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={teacherDetails.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={teacherDetails.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={teacherDetails.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="contact"
              value={teacherDetails.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacherModal;
