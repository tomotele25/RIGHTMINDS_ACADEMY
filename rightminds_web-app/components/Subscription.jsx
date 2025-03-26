import React from "react";

import { FaBook } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import SubscriptionCard from "./SubscriptionCard";
const Subscription = () => {
  const courseContent = [
    {
      price: "₦300/day ",
      image: "/course_card.png",
      icon: <FaCrown size={40} color="gold" />,
      heading: "Anually",
      sub_heading:
        " The best value! Get a full year of premium access and exclusive benefits",
    },
    {
      price: "₦8,000/month ",
      image: "/course_card1.png",
      icon: <FaGraduationCap size={40} color="green" />,
      heading: " Monthly",
      sub_heading:
        "Enjoy unlimited access to all features for an entire month—great for regular learners!",
    },
    {
      price: "₦45,000/year ",
      image: "course_card2.png",
      icon: <FaBook size={40} color="blue" />,
      heading: "Daily",
      sub_heading:
        "Get full access for a day—perfect for quick learning or short-term needs!",
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
                price={content.price}
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
