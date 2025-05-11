import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaBullhorn,
  FaFileAlt,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [totalstudents, setTotalstudents] = useState(null);
  const [totalTeachers, setTotalTeachers] = useState(null);
  const [error, setError] = useState("");
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/students`);
        setTotalstudents(response.data.totalStudents);
      } catch (err) {
        setError("Failed to fetch student count.");
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/totalteachers`);
        setTotalTeachers(response.data.totalTeachers);
      } catch (err) {
        setError("Failed to fetch teacher count.");
      }
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-2  min-h-screen text-gray-800">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition hover:shadow-md hover:scale-[1.02]">
            <div className="text-2xl text-blue-600 mb-2">
              <FaUserGraduate />
            </div>
            <h2 className="text-sm text-gray-600">Total Students</h2>
            <p className="text-2xl font-semibold text-gray-800">
              {totalstudents ?? "Loading..."}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition hover:shadow-md hover:scale-[1.02]">
            <div className="text-2xl text-blue-600 mb-2">
              <FaChalkboardTeacher />
            </div>
            <h2 className="text-sm text-gray-600">Total Teachers</h2>
            <p className="text-2xl font-semibold text-gray-800">
              {totalTeachers ?? "Loading..."}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition hover:shadow-md hover:scale-[1.02]">
            <div className="text-2xl text-blue-600 mb-2">
              <FaBookOpen />
            </div>
            <h2 className="text-sm text-gray-600">Courses</h2>
            <p className="text-2xl font-semibold text-gray-800">14</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition hover:shadow-md hover:scale-[1.02]">
            <div className="text-2xl text-blue-600 mb-2">
              <FaFileAlt />
            </div>
            <h2 className="text-sm text-gray-600">Reports</h2>
            <p className="text-2xl font-semibold text-gray-800">5</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <a
            href="/admin/students"
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02] transition"
          >
            <div className="text-2xl text-blue-600 mb-2">
              <FaUserGraduate />
            </div>
            <span className="text-gray-800 font-medium">Manage Students</span>
          </a>
          <a
            href="/admin/teachers"
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02] transition"
          >
            <div className="text-2xl text-blue-600 mb-2">
              <FaChalkboardTeacher />
            </div>
            <span className="text-gray-800 font-medium">Manage Teachers</span>
          </a>
          <a
            href="/admin/announcements"
            className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:scale-[1.02] transition"
          >
            <div className="text-2xl text-blue-600 mb-2">
              <FaBullhorn />
            </div>
            <span className="text-gray-800 font-medium">Announcements</span>
          </a>
        </div>

        {/* Bottom Grid: Activity, Analytics, Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="text-sm space-y-3">
              <li>✅ New student registered (John Doe)</li>
              <li>📝 Teacher updated course (Math 101)</li>
              <li>📢 Announcement posted (Orientation)</li>
              <li>📥 Report uploaded by Admin</li>
            </ul>
          </div>

          {/* Mini Analytics */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Analytics</h2>
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-xl font-semibold">+8.4% this month</p>
              </div>
            </div>
            <div className="mt-6 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
              Chart placeholder
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                PTA Meeting – May 15
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Exam Week – May 22
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Workshop – June 5
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
