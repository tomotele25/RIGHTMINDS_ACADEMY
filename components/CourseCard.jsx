import Link from "next/link";
import React from "react";

const CourseCard = ({ image, heading, sub_heading }) => {
  return (
    <div className="max-w-sm  border border-gray-200 rounded-lg shadow-sm  bg-white transition-transform duration-300 ease-in-out hover:scale-105">
      <a href="#">
        <img class="rounded-t-lg" src={image} alt="" />
      </a>

      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">
            {heading}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 ">{sub_heading}</p>
        <Link
          href="/Signup"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 hover:bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
