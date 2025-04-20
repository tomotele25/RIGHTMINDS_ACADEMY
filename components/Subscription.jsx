import React from "react";
import { FaBook, FaGraduationCap, FaCrown } from "react-icons/fa";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  const courseContent = [
    {
      price: "₦300/day",
      icon: <FaBook size={40} color="blue" />,
      heading: "Daily",
      sub_heading:
        "Get full access for a day—perfect for quick learning or short-term needs!",
    },
    {
      price: "₦8,000/month",
      icon: <FaGraduationCap size={40} color="green" />,
      heading: "Monthly",
      sub_heading:
        "Enjoy unlimited access to all features for an entire month—great for regular learners!",
    },
    {
      price: "₦45,000/year",
      icon: <FaCrown size={40} color="gold" />,
      heading: "Annually",
      sub_heading:
        "The best value! Get a full year of premium access and exclusive benefits.",
    },
  ];

  return (
    <div className="bg-white px-6 sm:px-8 lg:px-10 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-black">
          Subscription Plans
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Choose the plan that best fits your learning journey.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {courseContent.map((content, index) => (
          <SubscriptionCard
            key={index}
            icon={content.icon}
            price={content.price}
            heading={content.heading}
            sub_heading={content.sub_heading}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscription;
