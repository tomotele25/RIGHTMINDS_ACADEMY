import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://dygdwwlixswawfovcreh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5Z2R3d2xpeHN3YXdmb3ZjcmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNjg5NzQsImV4cCI6MjA2NDY0NDk3NH0.cxgMSH3HbK28jE3JdZPHDVIbbybOUc2sUkxyG8Nnqfc"
);

// Initial form state
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

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedCourseFile, setSelectedCourseFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCourseFile, setUploadingCourseFile] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/getCourses`);
        if (res.data?.success) {
          setCourses(res.data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };
    fetchCourses();
  }, []);

  const uploadToSupabase = async (file, folder) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Supabase upload error:", error.message);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
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
      console.error("Create error:", error.response?.data || error.message);
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
          prev.map((c) => (c._id === id ? response.data.course : c))
        );
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => setSelectedImageFile(e.target.files[0]);
  const handleCourseFileSelect = (e) =>
    setSelectedCourseFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image;
    let courseFileUrl = formData.url;

    if (selectedImageFile) {
      setUploadingImage(true);
      const uploadedImageUrl = await uploadToSupabase(
        selectedImageFile,
        "images"
      );
      setUploadingImage(false);
      if (!uploadedImageUrl) return alert("Image upload failed.");
      imageUrl = uploadedImageUrl;
    }

    if (selectedCourseFile) {
      setUploadingCourseFile(true);
      const folder = formData.type === "pdf" ? "pdfs" : "videos";
      const uploadedCourseUrl = await uploadToSupabase(
        selectedCourseFile,
        folder
      );
      setUploadingCourseFile(false);
      if (!uploadedCourseUrl) return alert("Course file upload failed.");
      courseFileUrl = uploadedCourseUrl;
    }

    const payload = {
      title: formData.title,
      department: formData.department,
      level: formData.level,
      instructor: formData.instructor,
      description: formData.description,
      type: formData.type,
      image: imageUrl,
      pdfUrl: formData.type === "pdf" ? courseFileUrl : null,
      videoUrl: formData.type === "video" ? courseFileUrl : null,
    };

    if (isEditing) {
      await fetchUpdateCourse(formData.id, payload);
    } else {
      await fetchCreateCourse(payload);
    }

    setFormData(initialForm);
    setSelectedImageFile(null);
    setSelectedCourseFile(null);
    setIsEditing(false);
  };

  const handleEdit = (course) => {
    setFormData({
      id: course._id,
      title: course.title,
      department: course.department,
      level: course.level,
      instructor: course.instructor,
      description: course.description,
      type: course.type,
      image: course.image || "",
      url: course.pdfUrl || course.videoUrl || "",
    });
    setSelectedImageFile(null);
    setSelectedCourseFile(null);
    setIsEditing(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          {isEditing ? "Edit Course" : "Create New Course"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            required
            className="border p-2 rounded col-span-full"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Level (e.g. 100)"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Instructor"
            required
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border p-2 rounded col-span-full"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
          </select>

          <div className="flex flex-col">
            <label>Upload {formData.type === "pdf" ? "PDF" : "Video"}</label>
            <input
              type="file"
              accept={formData.type === "pdf" ? ".pdf" : "video/*"}
              onChange={handleCourseFileSelect}
              required={!isEditing}
            />
            {uploadingCourseFile && (
              <p className="text-blue-600 text-sm">Uploading...</p>
            )}
            {formData.url && !selectedCourseFile && (
              <a
                href={formData.url}
                target="_blank"
                className="text-blue-700 underline"
              >
                View current file
              </a>
            )}
          </div>

          <div className="flex flex-col">
            <label>Upload Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              required={!isEditing}
            />
            {uploadingImage && (
              <p className="text-blue-600 text-sm">Uploading...</p>
            )}
            {formData.image && !selectedImageFile && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-16 object-cover mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4 col-span-full"
          >
            {isEditing ? "Update Course" : "Create Course"}
          </button>
        </form>

        {/* Course List */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Existing Courses</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border rounded p-4 bg-white shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h4 className="font-bold">{course.title}</h4>
                <p className="text-sm">
                  {course.department} - {course.level} Level
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {course.instructor}
                </p>
                <button
                  onClick={() => handleEdit(course)}
                  className="mt-3 text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCourse;
