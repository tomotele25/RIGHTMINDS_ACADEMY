import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EnrolledCourseCard() {
  const BACKENDURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = courses[currentIndex];

  const handleNextClick = () => {
    if (currentIndex < courses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/getCourses`);
        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    getCourses();
  }, []);

  if (!content) {
    return (
      <p className="text-center text-gray-500">
        You haven't enrolled in any courses yet.
      </p>
    );
  }

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      {/* Prev Button */}
      <button
        onClick={handlePrevClick}
        disabled={currentIndex === 0}
        className={`p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition ${
          currentIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <img src="/move-left.svg" height={35} width={35} alt="Previous" />
      </button>

      {/* Course Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Image */}
        <div className="relative mb-4">
          <img
            src={content.image || "/default-course.jpg"}
            alt="Course"
            className="rounded-lg w-full h-40 object-cover"
          />
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {content.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{content.details}</p>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link
            href={`/Course?id=${content._id}`} // or `/Course/${content._id}` if that's your routing style
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition duration-300"
          >
            Continue
          </Link>
          <button className="text-gray-500 text-sm hover:underline">
            View Details
          </button>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNextClick}
        disabled={currentIndex === courses.length - 1}
        className={`p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition ${
          currentIndex === courses.length - 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <img src="/move-right.svg" height={35} width={35} alt="Next" />
      </button>
    </div>
  );
}
