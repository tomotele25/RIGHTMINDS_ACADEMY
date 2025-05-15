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
  url: "",
};

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all courses when the component mounts
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

  const fetchCreateCourse = async () => {
    const payload = {
      title: formData.title,
      department: formData.department,
      level: formData.level,
      instructor: formData.instructor,
      description: formData.description,
      type: formData.type,
      pdfUrl: formData.type === "pdf" ? formData.url : undefined,
      videoUrl: formData.type === "video" ? formData.url : undefined,
    };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setCourses((prev) =>
        prev.map((course) => (course.id === formData.id ? formData : course))
      );
    } else {
      fetchCreateCourse();
    }

    setFormData(initialForm);
    setIsEditing(false);
  };

  const handleEdit = (course) => {
    setFormData({
      ...course,
      url: course.pdfUrl || course.videoUrl || "",
    });
    setIsEditing(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          {isEditing ? "Edit Course" : "Create New Course"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 bg-white p-4 rounded shadow max-w-2xl"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            required
            className="border p-2 rounded text-black"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="border p-2 rounded text-black"
          />
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Level (e.g. 100)"
            required
            className="border p-2 rounded text-black"
          />
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Instructor"
            required
            className="border p-2 rounded text-black"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded text-black"
          ></textarea>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded text-black"
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
            required
            className="border p-2 rounded text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update Course" : "Create Course"}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-black mb-2">All Courses</h3>
          <ul className="grid gap-2">
            {courses.map((course) => (
              <li
                key={course._id || course.id}
                className="bg-gray-100 p-4 rounded flex justify-between items-start"
              >
                <div className="text-black">
                  <h4 className="font-bold">{course.title}</h4>
                  <p>
                    {course.department} / {course.level} Level
                  </p>
                  <p>{course.description}</p>
                  <p>Instructor: {course.instructor}</p>
                  <p>Type: {course.type.toUpperCase()}</p>
                </div>
                <button
                  onClick={() => handleEdit(course)}
                  className="text-blue-600 hover:underline"
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
