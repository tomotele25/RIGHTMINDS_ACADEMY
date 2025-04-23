import EnrolledCourseCard from "@/components/EnrolledCourseCard";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { data } from "autoprefixer";
const StudentDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { data: session, status } = useSession();
  console.log(session?.user.name);
  const userName = session?.user?.name || "User";
  setTimeout(() => {
    setShowWelcome(false);
  }, 5000);

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
      <div className="space-y-12">
        {showWelcome && (
          <div className="p-4 text-sm md:text-lg font-medium text-gray-800 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 relative">
            👋 Welcome back,{" "}
            <span className="font-semibold text-black">{userName}</span>
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        )}
        {/* Welcome Banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-slate-100 to-slate-50 p-4 md:p-6 rounded-xl border border-gray-200">
          <img
            src="/Ellipse 514 (6).svg"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-slate-300"
            alt="User Avatar"
          />
          <h1 className="text-black text-wrap text-xl md:text-2xl font-semibold">
            Tomotele Christopher
          </h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-black mb-2">
              Weekly Streak
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nice work! Routines set you up <br /> for success.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-4">
            <img src="/flame.svg" alt="Flame" className="w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold text-black">1 week</h2>
              <p className="text-gray-600 text-sm">Current streak</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">📚</span>
                <span>294/30 course minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">🗓️</span>
                <span>5/1 visit</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-500 text-xs">Mar 30 - Apr 12</p>
              <Link
                href="/activity"
                className="text-blue-500 underline text-sm hover:text-blue-600"
              >
                See all activity
              </Link>
            </div>
          </div>
        </div>

        {/* Course Progress Section */}
        <section className="space-y-4">
          <h1 className="text-2xl text-black font-semibold">
            Pick up where you left off
          </h1>

          <div className="pt-2">
            <h2 className="text-lg font-medium text-gray-700">Courses</h2>
            <hr className="my-4" />
            <div className="">
              <EnrolledCourseCard />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
