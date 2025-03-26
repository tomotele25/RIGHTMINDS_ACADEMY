import React from "react";

import { FaBook } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import SubscriptionCard from "./SubscriptionCard";
const Subscription = () => {
  const courseContent = [
    {
      image: "/course_card.png",
      icon: <FaCrown size={40} color="gold" />,
      heading: "Elite",
      sub_heading:
        " Enjoy VIP access to premium content, mentorship, and advanced learning",
    },
    {
      image: "/course_card1.png",
      icon: <FaGraduationCap size={40} color="green" />,
      heading: " Premium",
      sub_heading:
        "Dive deeper with exclusive courses, expert insights, and personalized support",
    },
    {
      image: "course_card2.png",
      icon: <FaBook size={40} color="blue" />,
      heading: "Basic",
      sub_heading:
        "Get free access to essential learning materials and community updates",
    },
  ];
  return (
    <div className=" px-6 bg-white sm:px-8 lg:px-10 grid gap-10 p-10 ">
      <div className="text-black flex justify-center text-3xl sm:text-4xl">
        <h1>Subscription</h1>
      </div>
      <div className="grid sm:grid sm:grid-cols-2 lg:flex gap-9">
        {courseContent.map((content, index) => {
          return (
            <div className="grid sm:flex gap-5" key={index}>
              <SubscriptionCard
                icon={content.icon}
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

export default Subscription;
