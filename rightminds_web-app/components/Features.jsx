import React from "react";
import Card from "./Card";

import Shield from "../public/shield.svg";
import Users from "../public/users.svg";
import Brain from "../public/brain.svg";
import Earth from "../public/earth.svg";
const Features = () => {
  const cardContent = [
    {
      image: "/users.svg",
      heading: " Role-Based Learning",
      sub_heading:
        "Step into the shoes of a student, teacher, or mentor and experience education in a whole new way.",
    },
    {
      image: "/brain.svg",
      heading: "Interactive Courses & Quizzes",
      sub_heading:
        " Learn through hands-on activities, assignments, and real-world scenarios",
    },
    {
      image: "/earth.svg",
      heading: " Learn Anytime, Anywhere",
      sub_heading:
        "Our flexible platform lets you access courses and classrooms from any device",
    },
    {
      image: "/shield.svg",
      heading: "Safe & Secure Communication",
      sub_heading:
        "Connect with classmates and teachers in a protected environment.",
    },
  ];
  return (
    <div id="features" className="  px-6 sm:px-8 lg:px-10 grid gap-10 p-10 ">
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-4xl text-black">Why Choose Us</h1>
      </div>
      <div className="grid sm:grid sm:grid-cols-2 lg:flex gap-9">
        {cardContent.map((content, index) => {
          return (
            <div className="grid sm:flex gap-5" key={index}>
              <Card
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

export default Features;
