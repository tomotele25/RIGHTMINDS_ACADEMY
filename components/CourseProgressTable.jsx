import React, { useState } from "react";

const availableCourses = [
  { name: "Biochemistry", instructor: "Dr. Ogbonna" },
  { name: "Organic Chemistry", instructor: "Prof. Adebayo" },
  { name: "Molecular Biology", instructor: "Dr. Femi" },
];

const CourseProgressTable = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedCourse, setEditedCourse] = useState({});

  const handleAddCourse = () => {
    if (!selectedCourse) return;

    const courseData = availableCourses.find((c) => c.name === selectedCourse);

    if (courses.some((c) => c.name === selectedCourse)) {
      alert("Course already added!");
      return;
    }

    setCourses([
      ...courses,
      {
        name: courseData.name,
        instructor: courseData.instructor,
        progress: "",
        grade: "",
        nextDeadline: "",
        status: "",
      },
    ]);

    setSelectedCourse(""); // Reset dropdown
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedCourse({ ...courses[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = [...courses];
    updated[editIndex] = { ...updated[editIndex], ...editedCourse };
    setCourses(updated);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "text-green-600";
      case "Catching Up":
        return "text-yellow-600";
      case "Excellent":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Course Picker */}
      <div className="flex gap-4 items-center">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border rounded px-4 py-2 w-60"
        >
          <option value="">Select a course</option>
          {availableCourses.map((course) => (
            <option key={course.name} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Course / Module</th>
              <th className="py-3 px-4 text-left">Instructor</th>
              <th className="py-3 px-4 text-left">Progress</th>
              <th className="py-3 px-4 text-left">Grade</th>
              <th className="py-3 px-4 text-left">Next Deadline</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                {editIndex === index ? (
                  <>
                    <td className="py-3 px-4">{course.name}</td>
                    <td className="py-3 px-4">{course.instructor}</td>
                    <td className="py-3 px-4">
                      <input
                        name="progress"
                        value={editedCourse.progress}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        name="grade"
                        value={editedCourse.grade}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        name="nextDeadline"
                        value={editedCourse.nextDeadline}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        name="status"
                        value={editedCourse.status}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-gray-500 font-medium"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{course.name}</td>
                    <td className="py-3 px-4">{course.instructor}</td>
                    <td className="py-3 px-4">{course.progress}</td>
                    <td className="py-3 px-4">{course.grade}</td>
                    <td className="py-3 px-4">{course.nextDeadline}</td>
                    <td
                      className={`py-3 px-4 font-medium ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status}
                    </td>
                    <td className="py-3 px-4 flex gap-5">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 font-medium"
                      >
                        delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseProgressTable;
