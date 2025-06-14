import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/AdminLayout";
import {
  FaBookOpen,
  FaFileAlt,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import Barchart from "@/components/Barchart";

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
        // Handle errors here if needed
      }
    };
    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-gray-50 text-gray-800">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* ─────────────── TOP STATS ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Chart Card */}
          <div className="sm:col-span-2 bg-sky-100 rounded-xl p-6 border border-sky-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-6">
              <Barchart
                students={totalStudents ?? 0}
                teachers={totalTeachers ?? 0}
              />
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-sky-700">Students:</span>{" "}
                  <span className="text-lg font-semibold text-sky-900">
                    {totalStudents ?? "..."}
                  </span>
                </div>
                <div>
                  <span className="text-sky-700">Teachers:</span>{" "}
                  <span className="text-lg font-semibold text-sky-900">
                    {totalTeachers ?? "..."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-amber-100 rounded-xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaBookOpen className="text-2xl text-amber-600" />
              <div>
                <h2 className="text-sm text-amber-700">Courses</h2>
                <p className="text-2xl font-semibold text-amber-900">14</p>
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-rose-100 rounded-xl p-6 border border-rose-200 shadow-sm hover:shadow-md transition hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <FaFileAlt className="text-2xl text-rose-600" />
              <div>
                <h2 className="text-sm text-rose-700">Reports</h2>
                <p className="text-2xl font-semibold text-rose-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────── MIDDLE SECTION ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Recent Activity
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✅ New student registered (John Doe)</li>
              <li>📝 Teacher updated course (Math 101)</li>
              <li>📢 Announcement posted (Orientation)</li>
              <li>📥 Report uploaded by Admin</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Quick Analytics
            </h2>
            <div className="flex items-center gap-4">
              <FaChartLine className="text-4xl text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-xl font-semibold">+8.4% this month</p>
              </div>
            </div>
            <div className="mt-6 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Chart placeholder
            </div>
          </div>

          <div className="lg:row-span-2 bg-white rounded-2xl p-6 shadow border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Upcoming Events
            </h2>
            <ul className="space-y-4 text-sm text-gray-600">
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
