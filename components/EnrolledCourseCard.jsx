import Link from "next/link";
import { useState } from "react";

export default function EnrolledCourseCard() {
  const enrolledCourseContents = [
    {
      image: "course_card.png",
      status: "Completed",
      title: "Human Anatomy",
      details:
        "Explore the structure of the human body, understand major systems, and build a strong foundation in anatomy.",
      progress: "100%",
    },
    {
      image: "course_card.png",
      status: "In progress",
      title: "Physiology",
      details:
        "Dive into the functions of body systems and learn how different organs work together to maintain life.",
      progress: "65%",
    },
    {
      image: "course_card1.png",
      status: "Not started",
      title: "Microbiology",
      details:
        "Discover the microscopic world of bacteria, viruses, and fungi, and their roles in health and disease.",
      progress: "0%",
    },
    {
      image: "course_card2.png",
      status: "In progress",
      title: "Pharmacology",
      details:
        "Understand drug actions, therapeutic uses, and how medications affect different body systems.",
      progress: "40%",
    },
    {
      image: "course_card3.png",
      status: "Completed",
      title: "Pathology",
      details:
        "Learn about the nature of diseases, their causes, and the changes they bring to tissues and organs.",
      progress: "100%",
    },
    {
      image: "course_card.png",
      status: "In progress",
      title: "Medical Ethics",
      details:
        "Examine the principles guiding healthcare decisions, patient rights, and professional responsibilities.",
      progress: "20%",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = enrolledCourseContents[currentIndex];
  const progressPercent = parseInt(content.progress);

  const handleNextCLick = () => {
    if (currentIndex < enrolledCourseContents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrevCLick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <>
      <div className="flex items-center gap-5">
        <span onClick={handlePrevCLick}>
          <img src="/circle-arrow-left.svg" height={35} width={35} alt="" />
        </span>
        <div className="bg-white p-6 rounded-lg shadow-lg  w-full">
          {/* Image */}
          <div className="relative mb-4">
            <img
              src={content.image}
              alt="Course Image"
              className="rounded-lg w-full h-40 object-cover"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-lg">
              {content.progress}
            </div>
          </div>

          {/* Course Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {content.title}
          </h3>

          {/* Course Description */}
          <p className="text-sm text-gray-600 mb-4">{content.details}</p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-600 mb-1">
              {content.status}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progressPercent}% ` }}
              ></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <Link
              href="/Course"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition duration-300"
            >
              Continue
            </Link>
            <button className="text-gray-500 text-sm hover:underline">
              View Details
            </button>
          </div>
        </div>

        <span onClick={handleNextCLick}>
          <img src="/circle-arrow-right.svg" height={35} width={35} alt="" />
        </span>
      </div>
    </>
  );
}
