import Layout from "@/components/Layout";
import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";

const Student_Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,250",
      icon: <FaUserGraduate className="text-blue-500 text-3xl" />,
    },
    {
      title: "Total Teachers",
      value: "75",
      icon: <FaChalkboardTeacher className="text-green-500 text-3xl" />,
    },
    {
      title: "Total Courses",
      value: "45",
      icon: <FaBook className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Upcoming Events",
      value: "5",
      icon: <FaCalendarAlt className="text-red-500 text-3xl" />,
    },
  ];

  const announcements = [
    {
      title: "Exam Schedule Released",
      date: "March 22, 2025",
      details:
        "The final exam schedule has been released. Check your portal for details.",
    },
    {
      title: "Holiday Notice",
      date: "April 1, 2025",
      details: "School will remain closed for Easter break from April 1-5.",
    },
  ];
  return (
    <Layout>
      <div>
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to the School Dashboard
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
              >
                {stat.icon}
                <div>
                  <h2 className="text-xl font-semibold">{stat.value}</h2>
                  <p className="text-gray-500">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Announcements
            </h2>
            {announcements.map((announcement, index) => (
              <div key={index} className="border-b last:border-none py-3">
                <h3 className="text-lg font-semibold">{announcement.title}</h3>
                <p className="text-gray-500 text-sm">{announcement.date}</p>
                <p className="text-gray-700">{announcement.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student_Dashboard;
