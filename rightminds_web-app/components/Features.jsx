import React from "react";

const cardContent = [
  {
    image: "/users.svg",
    heading: "Role-Based Learning",
    sub_heading:
      "Step into the shoes of a student, teacher, or mentor and experience education in a whole new way.",
    iconBg: "bg-blue-100",
  },
  {
    image: "/brain.svg",
    heading: "Interactive Courses & Quizzes",
    sub_heading:
      "Learn through hands-on activities, assignments, and real-world scenarios.",
    iconBg: "bg-green-100",
  },
  {
    image: "/earth.svg",
    heading: "Learn Anytime, Anywhere",
    sub_heading:
      "Our flexible platform lets you access courses and classrooms from any device.",
    iconBg: "bg-yellow-100",
  },
  {
    image: "/shield.svg",
    heading: "Safe & Secure Communication",
    sub_heading:
      "Connect with classmates and teachers in a protected environment.",
    iconBg: "bg-purple-100",
  },
];

const Features = () => {
  return (
    <div
      id="features"
      className="bg-white px-6 sm:px-8 lg:px-10 grid gap-10 p-10"
    >
      <div className="flex justify-center">
        <h1 className="text-3xl sm:text-4xl text-black font-semibold">
          Why Choose Us
        </h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
        {cardContent.map((content, index) => (
          <div
            key={index}
            className="flex justify-center items-center transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-shadow duration-300 ease-in-out w-full h-full">
              <div
                className={`flex justify-center items-center h-20 w-20 mx-auto mb-5 rounded-full ${content.iconBg}`}
              >
                <img
                  src={content.image}
                  alt={content.heading}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold text-center text-black mb-2">
                {content.heading}
              </h2>
              <p className="text-sm text-gray-600 text-center">
                {content.sub_heading}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
