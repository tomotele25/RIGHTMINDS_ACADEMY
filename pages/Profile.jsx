import Layout from "@/components/Layout";
import Link from "next/link";
("../utils/Link");
import React, { useState, useRef } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const filePicker = useRef();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };
  return (
    <div>
      <Layout>
        <div className="p-4 md:p-6 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-4 md:space-y-0 mb-8">
            {/* Avatar */}
            <div
              className=" relative  border-2 rounded-full"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={image || "/user.svg"}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover cursor-pointer"
              />
              <img
                src="image-plus.svg"
                className="absolute bottom-2 right-0 w-6 h-6 bg-white rounded-full shadow cursor-pointer"
                alt="Change"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            {/* Profile Information */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-semibold text-black">
                Tomotele Christopher
              </h1>
              <p className="text-sm text-black">test@gmail.com</p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

          {/* Personal Info Section */}
          <div className="space-y-6">
            {[
              {
                label: "Full Name",
                value: "Tomotele Christopher",
                type: "text",
                placeholder: "Enter your new name",
              },
              {
                label: "Email",
                value: "test@gmail.com",
                type: "text",
                placeholder: "test@gmail.com",
              },
              {
                label: "Phone",
                value: "123-456-7890",
                type: "text",
                placeholder: "123-456-7890",
              },
            ].map((field, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center gap-2"
              >
                <label
                  htmlFor={field.label.toLowerCase()}
                  className="w-full md:w-32 text-gray-600"
                >
                  {field.label}:
                </label>
                {isEditing ? (
                  <input
                    type={field.type}
                    id={field.label.toLowerCase()}
                    placeholder={field.placeholder}
                    className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{field.value}</p>
                )}
              </div>
            ))}

            {/* Bio */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <label htmlFor="bio" className="w-full md:w-32 text-gray-600">
                Bio:
              </label>
              {isEditing ? (
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows="4"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              ) : (
                <p className="text-gray-800">i know my thing</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Social Links
            </h2>
            <ul className="space-y-2">
              {["LinkedIn", "GitHub", "Twitter"].map((platform, index) => (
                <li key={index}>
                  <a href="#" className="text-blue-600 hover:underline">
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <span className="flex justify-center sm:justify-start">
          <h1 className="text-black text-2xl"> Account Settings </h1>
        </span>{" "}
        <span className="flex justify-center  pt-10 ">
          <img src="Ellipse 514 (6).svg" alt="" />
        </span>
        <span className=" flex flex-col justify-center items-center sm:grid sm:grid-cols-2 w-full sm:place-items-center gap-10 sm:px-40 pt-10">
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Email
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Change password
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5">
            <label className="text-black" htmlFor="">
              Confirm password
            </label>
            <input
              type="text"
              className=" w-64
                 h-10 rounded-md"
            />
          </span>
          <span className="grid gap-5    ">
            <label className="text-black " htmlFor="">
              Bio
            </label>
            <textarea name="" className="w-64 h-10 p-2" id="">
              description
            </textarea>
          </span>
        </span>
        <span className="items-center justify-center pt-10 flex">
          <button className="bg-blue-800 w-[62%] h-10 rounded-lg ">
            Update
          </button>
        </span>
  */}
      </Layout>
    </div>
  );
};

export default Profile;
