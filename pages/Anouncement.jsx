import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Anouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getAnnouncements`);
        setAnnouncements(response.data.data); // Directly set the announcements data
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="text-black text-3xl">Announcement</h1>

        <div className="grid gap-6 pt-10">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements available.</p>
          ) : (
            announcements.map((announcement, index) => (
              <div
                key={announcement._id || index}
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
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Anouncement;
