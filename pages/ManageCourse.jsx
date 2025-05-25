import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";

const initialForm = {
  id: null,
  title: "",
  department: "",
  level: "",
  instructor: "",
  description: "",
  type: "pdf",
  image: "",
  url: "",
};

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

// Your Cloudinary config (replace with your actual cloud name and preset)
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dayafwzz7/upload";
const CLOUDINARY_UPLOAD_PRESET = "image-preset";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getCourses`);
        if (response.data?.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };
    fetchCourses();
  }, []);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        // Return the full URL to the uploaded image
        return data.secure_url;
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const fetchCreateCourse = async (payload) => {
    try {
      const response = await axios.post(
        `${BACKENDURL}/api/createCourse`,
        payload
      );
      if (response.data?.success) {
        setCourses((prev) => [...prev, response.data.course]);
      }
    } catch (error) {
      console.error(
        "Error creating course:",
        error.response?.data || error.message
      );
    }
  };

  const fetchUpdateCourse = async (id, payload) => {
    try {
      const response = await axios.put(
        `${BACKENDURL}/api/updateCourse/${id}`,
        payload
      );
      if (response.data?.success) {
        setCourses((prev) =>
          prev.map((course) =>
            course._id === id ? response.data.course : course
          )
        );
      }
    } catch (error) {
      console.error(
        "Error updating course:",
        error.response?.data || error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (selectedImageFile) {
      const uploadedUrl = await uploadImageToCloudinary(selectedImageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
        setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      } else {
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const payload = {
      title: formData.title,
      department: formData.department,
      level: formData.level,
      instructor: formData.instructor,
      description: formData.description,
      type: formData.type,
      image: imageUrl,
      pdfUrl: formData.type === "pdf" ? formData.url : null,
      videoUrl: formData.type === "video" ? formData.url : null,
    };

    if (isEditing) {
      await fetchUpdateCourse(formData.id, payload);
      setIsEditing(false);
    } else {
      await fetchCreateCourse(payload);
    }

    setFormData(initialForm);
    setSelectedImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (course) => {
    setFormData({
      id: course._id || course.id,
      title: course.title,
      department: course.department,
      level: course.level,
      instructor: course.instructor,
      description: course.description,
      type: course.type,
      url: course.pdfUrl || course.videoUrl || "",
      image: course.image || "",
    });
    setSelectedImageFile(null);
    setImagePreview(course.image || null);
    setIsEditing(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          {isEditing ? "Edit Course" : "Create New Course"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            required
            className="border p-2 rounded text-black w-full col-span-1 sm:col-span-2 md:col-span-3"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="border p-2 rounded text-black w-full"
          />
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Level (e.g. 100)"
            required
            className="border p-2 rounded text-black w-full"
          />
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Instructor"
            required
            className="border p-2 rounded text-black w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border p-2 rounded text-black w-full col-span-1 sm:col-span-2 md:col-span-3"
            rows={3}
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded text-black w-full"
          >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
          </select>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder={formData.type === "pdf" ? "PDF URL" : "Video URL"}
            required
            className="border p-2 rounded text-black w-full col-span-1 sm:col-span-2"
          />

          <div className="col-span-1 flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Upload Course Image
            </label>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-40 object-contain rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded col-span-1 sm:col-span-2 md:col-span-3 hover:bg-blue-700 transition"
          >
            {isEditing ? "Update Course" : "Create Course"}
          </button>
        </form>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4 text-black">
          Existing Courses
        </h3>
        <ul>
          {courses.map((course) => (
            <li
              key={course._id || course.id}
              className="mb-3 cursor-pointer border p-4 rounded hover:bg-gray-100"
              onClick={() => handleEdit(course)}
            >
              <div className="flex items-center space-x-4">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-semibold text-black">{course.title}</p>
                  <p className="text-gray-600 text-sm">
                    Dept: {course.department} | Level: {course.level}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default ManageCourse;
