import React from "react";
import CourseCard from "./CourseCard";

const Courses = () => {
  return (
    <div className="px-6 sm:px-8 lg:px-10 grid gap-10  p-10">
      <span className="flex justify-center text-3xl sm:text-4xl">Courses </span>
      <span className="grid sm:flex lg:flex gap-10">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </span>
    </div>
  );
};

export default Courses;
