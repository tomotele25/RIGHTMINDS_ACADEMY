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

  const uploadImage = async (file) => {
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await fetch(`${BACKENDURL}/api/upload-image`, {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        const imageUrl = data.imageUrl;
        // Extract only the file name
        const filename = imageUrl.split("/").pop();
        return filename;
      } else {
        throw new Error(data.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageName = formData.image;

    if (selectedImageFile) {
      const uploadedFileName = await uploadImage(selectedImageFile);
      if (uploadedFileName) {
        imageName = uploadedFileName;
        setFormData((prev) => ({ ...prev, image: uploadedFileName }));
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
      image: imageName,
      pdfUrl: formData.type === "pdf" ? formData.url : null,
      videoUrl: formData.type === "video" ? formData.url : null,
    };

    if (isEditing) {
      setCourses((prev) =>
        prev.map((course) =>
          course._id === formData.id
            ? { ...course, ...payload, _id: formData.id }
            : course
        )
      );
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
    setImagePreview(
      course.image ? `${BACKENDURL}/uploads/${course.image}` : null
    );
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
            className="border p-2 rounded text-black w-full col-span-1 sm:col-span-2 md:col-span-3"
            rows={3}
          ></textarea>
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
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="PDF or Video URL"
            required={!selectedImageFile}
            className="border p-2 rounded text-black w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="col-span-1 sm:col-span-2 md:col-span-3"
          />

          {(imagePreview || formData.image) && (
            <img
              src={
                imagePreview ||
                (formData.image && `${BACKENDURL}/uploads/${formData.image}`)
              }
              alt="Selected Preview"
              className="mt-2 w-full max-w-xs h-auto object-cover border rounded col-span-1 sm:col-span-2 md:col-span-3"
            />
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-1 sm:col-span-2 md:col-span-3"
          >
            {isEditing ? "Update Course" : "Create Course"}
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-black mb-4 text-center">
            All Courses
          </h3>
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course) => (
              <li
                key={course._id || course.id}
                className="bg-gray-100 p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-start"
              >
                <div className="text-black flex-grow">
                  <h4 className="font-bold text-lg">{course.title}</h4>
                  <p className="text-sm">
                    {course.department} / {course.level} Level
                  </p>
                  <p className="mt-1 text-sm">{course.description}</p>
                  <p className="mt-1 text-sm">
                    Instructor: {course.instructor}
                  </p>
                  <p className="mt-1 text-sm">
                    Type: {course.type.toUpperCase()}
                  </p>
                  {course.image && (
                    <img
                      src={`${BACKENDURL}/uploads/${course.image}`}
                      alt={course.title}
                      className="mt-2 w-full max-w-[150px] h-auto object-cover rounded border"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleEdit(course)}
                  className="text-blue-600 hover:underline mt-4 sm:mt-0 sm:ml-4 self-start"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCourse;
