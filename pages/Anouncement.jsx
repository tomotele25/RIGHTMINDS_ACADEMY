import Layout from "@/components/Layout";
import React from "react";
import { useState } from "react";
const announcements = [
  {
    title: "System Maintenance",
    message:
      "We will be performing system maintenance from 10 PM to 2 AM. Please save your work.",
    date: "2025-04-10",
  },
  {
    title: "New Course Available",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eaque debitis. Quam beatae autem magnam. Nostrum explicabo dignissimos harum vel quasi, cumque similique. Quidem, incidunt. Beatae sed reprehenderit ullam hic.Check it out now!",
    date: "2025-04-09",
  },
  {
    title: "Upcoming Event: Webinar on AI",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eaque debitis. Quam beatae autem magnam. Nostrum explicabo dignissimos harum vel quasi, cumque similique. Quidem, incidunt. Beatae sed reprehenderit ullam hic.t 4 PM.",
    date: "2025-04-08",
  },
  {
    title: "Holiday Notice",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eaque   debitis. Quam beatae autem magnam. Nostrum explicabo dignissimos harum   vel quasi, cumque similique. Quidem, incidunt. Beatae sed   reprehenderit ullam hic..",
    date: "2025-04-07",
  },
];

const Anouncement = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div>
      <Layout>
        <span>
          <h1 className="text-black text-3xl">Anouncement</h1>
        </span>
        <div className="grid gap-6 pt-10">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {announcement.title}
              </h3>
              <p className="text-gray-600">
                {expandedIndex === index
                  ? announcement.message
                  : `${announcement.message.slice(0, 100)}...`}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <button
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => toggleReadMore(index)}
                >
                  {expandedIndex === index ? "Show Less" : "Read More"}
                </button>
                <span className="text-sm text-gray-400">
                  {announcement.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Anouncement;
