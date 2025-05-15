import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import AdminLayout from "@/components/AdminLayout";

const ManageAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("students");
  const [announcements, setAnnouncements] = useState([]);
  const [session, setSession] = useState(null); // State to store session data
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/api/getAnnouncements`);
      setAnnouncements(response.data.data); // Directly set the announcements data
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    }
  };
  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Fetch session and announcements on page load
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
    fetchAnnouncements();
  }, []);

  // Handle new announcement submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session || !session.user.accessToken) {
      alert("No access token found. Please log in.");
      return;
    }

    const token = session.user.accessToken;

    try {
      const res = await axios.post(
        `${BACKENDURL}/api/anouncement`,
        { title, message, audience },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setMessage("");
      setAudience("students");
      //   fetchAnnouncements();
      alert(res.data.message);
    } catch (err) {
      console.error("Error creating announcement:", err);
      alert("Failed to create announcement");
    }
  };

  if (!session) {
    return <div>Loading...</div>; // Optionally show a loading state while fetching the session
  }

  return (
    <AdminLayout>
      <div className="p-4 h-screen max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Announcements</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 rounded shadow"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="everyone">Everyone</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Announcement
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Previous Announcements</h3>
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageAnnouncements;
