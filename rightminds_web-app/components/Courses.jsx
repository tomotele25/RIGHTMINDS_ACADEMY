import React from "react";
import CourseCard from "./CourseCard";

const Courses = () => {
  const courseContent = [
    {
      image: "/course_card.png",
      heading: " Learn Chemistry",
      sub_heading:
        "Step into the shoes of a student, teacher, or mentor and experience education",
    },
    {
      image: "/course_card1.png",
      heading: " Learn Programming",
      sub_heading:
        " Learn through hands-on activities, assignments, and real-world scenarios",
    },
    {
      image: "course_card2.png",
      heading: " Learn Mathematics",
      sub_heading:
        "Our flexible platform lets you access courses and classrooms from any device",
    },
    {
      image: "course_card3.png",
      heading: "Worship with us",
      sub_heading:
        "Connect with classmates and teachers in a protected environment.",
    },
  ];
  return (
    <div className=" px-6 bg-white sm:px-8 lg:px-10 grid gap-10 p-10 ">
      <div className="text-black flex justify-center text-3xl sm:text-4xl">
        <h1>Courses</h1>
      </div>
      <div className="grid sm:grid sm:grid-cols-2 lg:flex gap-9">
        {courseContent.map((content, index) => {
          return (
            <div className="grid sm:flex gap-5" key={index}>
              <CourseCard
                image={content.image}
                heading={content.heading}
                sub_heading={content.sub_heading}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
