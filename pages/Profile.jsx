import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import axios from "axios";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { data: session } = useSession();
  const BACKENDURL =
    "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

  const [firstname, setFirstname] = useState(session?.user?.firstname || "");
  const [lastname, setLastname] = useState(session?.user?.lastname || "");
  const [username, setUsername] = useState(session?.user?.username || "");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const handleImageChange = () => {
    console.log("Open image uploader...");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      firstname,
      lastname,
      username,
      contact: phone, // backend expects 'contact'
      bio,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${BACKENDURL}/users/me`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated:", response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28">
            <img
              src="/user.svg"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            <button
              onClick={handleImageChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full p-1 border hover:scale-105 transition"
            >
              <img src="/image-plus.svg" alt="Change" />
            </button>
          </div>
          <div>
            <h1 className="text-xl capitalize font-semibold text-gray-900">
              {firstname} {lastname}
            </h1>
            <p className="text-sm text-gray-500">{username}</p>
          </div>
          <button
            onClick={() => setEditing((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 space-y-6"
        >
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
            Personal Info
          </h2>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            {editing ? (
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-gray-800">{firstname}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            {editing ? (
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-gray-800">{lastname}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>
            {editing ? (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-gray-800">{username}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">Phone</label>
            {editing ? (
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-gray-800">{phone}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-600">Bio</label>
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-gray-800">{bio}</p>
            )}
          </div>

          {editing && (
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition"
            >
              Save Changes
            </button>
          )}
        </form>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
            Social Links
          </h2>
          <ul className="space-y-2 text-sm text-blue-600">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-800 transition"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-800 transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-blue-800 transition"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
