import React from "react";

const SubscriptionCard = ({ icon, heading, sub_heading, price }) => {
  return (
    <div className="max-w-sm w-full border border-gray-200 rounded-xl bg-white shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md">
      <div className="flex justify-center pt-6">{icon}</div>
      <div className="p-6 flex flex-col gap-3 text-black">
        <h5 className="text-2xl font-semibold tracking-tight">{heading}</h5>
        <span className="text-xl font-medium">{price}</span>
        <p className="text-base text-gray-600">{sub_heading}</p>
        <a
          href="#"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-600 transition-colors duration-200"
        >
          Join now
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SubscriptionCard;
