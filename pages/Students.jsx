import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import { FaBars, FaUsers, FaTrashAlt } from "react-icons/fa";

const Students = () => {
  const [totalstudents, setTotalstudents] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/students`);
        setTotalstudents(response.data.totalStudents);
      } catch (err) {
        console.error("Error fetching student count:", err);
        setError("Failed to fetch student count.");
      }
    };

    const fetchStudentsData = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/students/data`);
        setStudentsData(response.data.studentsData);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to fetch student data.");
      }
    };

    fetchTotalStudents();
    fetchStudentsData();
  }, [BACKENDURL]);

  const cleanupFunction = async () => {
    try {
      const response = await axios.delete(`${BACKENDURL}/api/users/cleanup`);
      console.log("Cleanup finished:", response);
    } catch (error) {
      console.error("Error cleaning up students", error);
    }
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;

    try {
      setIsLoading(true);
      await axios.delete(`${BACKENDURL}/api/students/${studentToDelete}`);
      setStudentsData((prev) =>
        prev.filter((student) => student._id !== studentToDelete)
      );
      closeModal();
    } catch (err) {
      setError("Failed to delete student.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (studentId) => {
    setStudentToDelete(studentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStudentToDelete(null);
  };

  const toggleMenuModal = () => {
    setIsMenuOpened((prev) => !prev);
  };

  return (
    <AdminLayout>
      <div className="p-2 space-y-2 h-screen md:h-auto">
        {/* Profile Header Section */}
        <div className="bg-white p-2 rounded-md shadow-sm w-full flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
        <span className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">All Students</h2>
          <span className="relative">
            <p onClick={toggleMenuModal} className="cursor-pointer">
              <FaBars />
            </p>
            {isMenuOpened && (
              <div className="bg-white absolute right-0 mt-2 p-3 shadow-xl w-32 z-50 rounded-lg">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={cleanupFunction}
                >
                  <FaTrashAlt />
                  <span className="text-black">Cleanup</span>
                </div>
              </div>
            )}
          </span>
        </span>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Students Table */}
        <div className="overflow-x-auto md:w-full w-96 ">
          <table className="min-w-full table-auto border-separate border-spacing-0 rounded-lg">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {studentsData.length > 0 ? (
                studentsData.map((student, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 capitalize">
                      {student.firstname} {student.lastname}
                    </td>
                    <td className="py-4 px-6">{student.email}</td>
                    <td className="py-4 px-6 capitalize">{student.role}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleOpenModal(student._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this student? This action cannot
                be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Students;
