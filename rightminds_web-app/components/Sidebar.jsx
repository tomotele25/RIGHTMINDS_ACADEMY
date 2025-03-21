import React from "react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className=" hidden sm:fixed  sm:block  w-[17vw] sm:w-[25vw] h-[100vh] bg-white rounded-md  shadow-2xl pb-11 px-2 sm:px-4 lg:px-6">
      <div className="pt-3">
        <h1 className="text-2xl">Rightminds</h1>
      </div>
      <div className="flex flex-col justify-center h-full  gap-7 pt-6 ">
        <Link href="/" className=" gap-3 flex">
          <img src="/house.svg" alt="" />
          <p>Home</p>
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/book-open.svg" alt="" /> <p> Courses</p>
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/chart-line.svg" alt="" /> <p> Progress tracker </p>
        </Link>
        <Link href="/" className=" gap-2 flex text-nowrap">
          {" "}
          <img src="/brain.svg" alt="" /> <p> Quizzes </p>
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/bell.svg" alt="" /> <p> Announcements </p>{" "}
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/message-circle.svg" alt="" /> <p> Discussion Forums </p>{" "}
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/users.svg" alt="" /> <p> Profile & Settings </p>
        </Link>
        <Link href="/" className=" gap-2 flex">
          {" "}
          <img src="/log-out.svg" alt="" /> <p> Logout </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
