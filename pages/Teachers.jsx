import AdminLayout from "@/components/AdminLayout";
import CreateTeacherModal from "@/components/CreateTeacherModal";
import React, { useEffect, useState } from "react";
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";
import axios from "axios";

const Teachers = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openDeleteModal = (teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setTeacherToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${BACKENDURL}/api/getteachers`);
      setTeachers(res.data.teachersData);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  const handleDelete = async () => {
    if (!teacherToDelete) return;
    setIsLoading(true);
    try {
      await axios.delete(
        `${BACKENDURL}/api/deleteteacher/${teacherToDelete._id}`
      );
      fetchTeachers();
      closeDeleteModal();
    } catch (error) {
      console.error("Delete failed", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="">
      <AdminLayout>
        <div className="h-screen md:h-auto overflow-y-scroll flex flex-col">
          {/* Profile Header Section */}
          <div className="bg-white p-4 rounded-md shadow-sm w-full flex items-center gap-4 flex-wrap sm:flex-nowrap">
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

          {/* Action Section */}
          <div className="bg-white p-4 rounded-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            <h1 className="text-xl font-semibold text-gray-800">
              All Teachers
            </h1>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                />
              </div>

              <div className="flex gap-2">
                <button
                  title="Filter"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FaFilter size={14} className="text-gray-600" />
                </button>
                <button
                  onClick={openCreateModal}
                  title="Add Teacher"
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto md:w-full w-96  ">
            <table className="min-w-full table-auto border-separate border-spacing-0">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-left whitespace-nowrap">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left whitespace-nowrap">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left whitespace-nowrap">
                    Username
                  </th>
                  <th className="py-3 px-4 text-left whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr
                      key={teacher._id}
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="py-3 px-4 whitespace-nowrap capitalize">
                        {teacher.firstname} {teacher.lastname}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {teacher.email}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {teacher.username}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => openDeleteModal(teacher)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                          disabled={isLoading}
                        >
                          {isLoading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isCreateModalOpen && <CreateTeacherModal onClose={closeCreateModal} />}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-bold capitalize">
                  {teacherToDelete.firstname} {teacherToDelete.lastname}
                </span>
                ?
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </div>
  );
};

export default Teachers;
