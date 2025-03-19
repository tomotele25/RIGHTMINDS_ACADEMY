import React from "react";
import Card from "./Card";
const Features = () => {
  const cardContent = [
    {
      image: "",
      heading: " Role-Based Learning",
      sub_heading:
        "Step into the shoes of a student, teacher, or mentor and experience education in a whole new way.",
    },
    {
      image: "",
      heading: "Interactive Courses & Quizzes",
      sub_heading:
        " Learn through hands-on activities, assignments, and real-world scenarios",
    },
    {
      image: "",
      heading: " Learn Anytime, Anywhere",
      sub_heading:
        "Our flexible platform lets you access courses and classrooms from any device",
    },
    {
      image: "",
      heading: "Safe & Secure Communication",
      sub_heading:
        "Connect with classmates and teachers in a protected environment.",
    },
  ];
  return (
    <div className="  px-6 sm:px-8 lg:px-10 grid gap-10 p-10 ">
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-4xl">Why Choose Us</h1>
      </div>
      <div className="grid sm:flex gap-5">
        {cardContent.map((content, index) => {
          return (
            <div key={index}>
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
