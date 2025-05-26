import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaFileAlt,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalTeachers, setTotalTeachers] = useState(null);
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [{ data: s }, { data: t }] = await Promise.all([
          axios.get(`${BACKENDURL}/api/students`),
          axios.get(`${BACKENDURL}/api/totalteachers`),
        ]);
        setTotalStudents(s.totalStudents);
        setTotalTeachers(t.totalTeachers);
      } catch {
        // simplify error handling
      }
    };
    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 min-h-screen text-gray-800">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        {/* ───────────────  TOP STATS  ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="sm:col-span-2 bg-blue-100 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaUserGraduate className="text-3xl text-blue-600" />
              <div>
                <h2 className="text-sm text-gray-600">Total Students</h2>
                <p className="text-3xl font-semibold">
                  {totalStudents ?? "Loading..."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaChalkboardTeacher className="text-2xl text-green-600" />
              <div>
                <h2 className="text-sm text-gray-600">Total Teachers</h2>
                <p className="text-2xl font-semibold">
                  {totalTeachers ?? "Loading..."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaBookOpen className="text-2xl text-yellow-600" />
              <div>
                <h2 className="text-sm text-gray-600">Courses</h2>
                <p className="text-2xl font-semibold">14</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaFileAlt className="text-2xl text-purple-600" />
              <div>
                <h2 className="text-sm text-gray-600">Reports</h2>
                <p className="text-2xl font-semibold">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────  BOTTOM MASONRY  ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3 text-sm">
              <li>✅ New student registered (John Doe)</li>
              <li>📝 Teacher updated course (Math 101)</li>
              <li>📢 Announcement posted (Orientation)</li>
              <li>📥 Report uploaded by Admin</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Analytics</h2>
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-xl font-semibold">+8.4% this month</p>
              </div>
            </div>
            <div className="mt-6 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
              Chart placeholder
            </div>
          </div>

          <div className="lg:row-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-4 text-sm">
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
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Graduation – July 10
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
