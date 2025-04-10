import EnrolledCourseCard from "@/components/EnrolledCourseCard";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";

const Student_Dashboard = () => {
  // const stats = [
  //   {
  //     title: "Total Students",
  //     value: "1,250",
  //     icon: <FaUserGraduate className="text-blue-500 text-3xl" />,
  //   },
  //   {
  //     title: "Total Teachers",
  //     value: "75",
  //     icon: <FaChalkboardTeacher className="text-green-500 text-3xl" />,
  //   },
  //   {
  //     title: "Total Courses",
  //     value: "45",
  //     icon: <FaBook className="text-yellow-500 text-3xl" />,
  //   },
  //   {
  //     title: "Upcoming Events",
  //     value: "5",
  //     icon: <FaCalendarAlt className="text-red-500 text-3xl" />,
  //   },
  // ];

  // const announcements = [
  //   {
  //     title: "Exam Schedule Released",
  //     date: "March 22, 2025",
  //     details:
  //       "The final exam schedule has been released. Check your portal for details.",
  //   },
  //   {
  //     title: "Holiday Notice",
  //     date: "April 1, 2025",
  //     details: "School will remain closed for Easter break from April 1-5.",
  //   },
  // ];
  return (
    <Layout>
      <div>
        <span className="flex items-center gap-5 p-5 bg-slate-100 shadow-sm">
          <img
            src="/ProfilePic.svg"
            className="w-16 h-16 md:w-20 md:h-20"
            alt=""
          />
          <h1 className="text-black text-lg md:text-nowrap md:text-2xl font-semibold">
            Welcome back, Christopher
          </h1>
        </span>
        <div className=" grid grid-cols-1 gap-8 md:flex justify-between p-6 items-center mt-20 rounded-lg  border-2">
          <span>
            <h1 className="text-black text-2xl font-bold">Weekly streak</h1>
            <p className="text-black">
              Nice work! Routines set you up for success.
            </p>
          </span>
          <span className="flex gap-3">
            <img src="/flame.svg" height={40} width={40} alt="" />
            <span>
              <h1 className="text-black">1 week</h1>
              <p className="text-black">Current streak</p>
            </span>
          </span>
          <span className="grid gap-4 ">
            <span>
              <li className="text-black list-disc marker:text-orange-400 marker:text-lg ">
                294/30 course min
              </li>
              <li className="text-black  list-disc marker:text-green-900-400 marker:text-lg">
                5/1 visit
              </li>
              <p className="text-black">Mar 30 - Apr 12</p>
            </span>
            <span>
              <Link
                href="/activity"
                className="text-blue-500 underline text-sm underline-offset-2"
              >
                See all activity
              </Link>
            </span>
          </span>
        </div>
        <div>
          <span>
            <h1 className="text-black text-3xl pt-10 font-bold">
              Pick up where you left off
            </h1>
          </span>
          <div>
            <span>
              <h1 className="text-2xl text-black pt-5">Courses</h1>
            </span>
            <hr className="py-5" />
            <div className="flex items-center justify-evenly ">
              <span>
                <img
                  src="/circle-arrow-left.svg"
                  height={35}
                  width={35}
                  alt=""
                />
              </span>
              <span>
                <EnrolledCourseCard />
              </span>
              <span>
                <img
                  src="/circle-arrow-right.svg"
                  height={35}
                  width={35}
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student_Dashboard;

{
  /* <div className="p-6 bg-gray-100 min-h-screen"> */
}
{
  /* Welcome Message */
}
{
  /* <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to the School Dashboard
          </h1> */
}

{
  /* Stats Section */
}
{
  /* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
          </div> */
}

{
  /* Announcements */
}
{
  /* <div className="bg-white shadow-md rounded-lg p-6">
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
        </div> */
}
