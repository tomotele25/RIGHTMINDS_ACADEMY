import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";
const ManageQuiz = () => {
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  const [quizTitle, setQuizTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState(10); // default to 10 minutes as a number
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: [""],
      correctAnswerIndex: 0,
    },
  ]);

  useEffect(() => {
    const fetchDepartmentsAndLevels = async () => {
      try {
        const deptResponse = await axios.get(`${BACKENDURL}/api/departments`);
        setDepartments(deptResponse.data);

        const levelResponse = await axios.get(`${BACKENDURL}/api/levels`);
        setLevels(levelResponse.data);
      } catch (error) {
        console.error("Failed to fetch departments or levels:", error);
      }
    };

    fetchDepartmentsAndLevels();
  }, []);

  const updateQuestionText = (index, text) => {
    const updated = [...questions];
    updated[index].questionText = text;
    setQuestions(updated);
  };

  const updateOptionText = (questionIndex, optionIndex, text) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = text;
    setQuestions(updated);
  };

  const addOptionToQuestion = (index) => {
    const updated = [...questions];
    updated[index].options.push("");
    setQuestions(updated);
  };

  const setCorrectAnswer = (questionIndex, optionIndex) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswerIndex = optionIndex;
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [""], correctAnswerIndex: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKENDURL}/api/createQuiz`, {
        title: quizTitle,
        instructor, // <-- include instructor here if needed on backend
        course,
        duration, // now sent as a number
        level: selectedLevel,
        department: selectedDepartment,
        questions,
      });

      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="text-black">
      <AdminLayout>
        <form className="p-6 space-y-10" onSubmit={handleSubmit}>
          {/* Quiz Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium">Quiz Title</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Instructor</label>
              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Duration (minutes)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))} // <-- key fix here
                className="w-full px-4 py-2 border rounded-lg"
              >
                {[10, 15, 20, 30, 45, 60].map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Level</option>
                {levels.map((level, idx) => (
                  <option key={idx} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Department</option>
                {departments.map((dep, idx) => (
                  <option key={idx} value={dep.name}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-10">
            <h3 className="text-xl font-semibold">Questions</h3>
            {questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="p-4 border rounded-lg bg-gray-50 space-y-4"
              >
                <div>
                  <label className="block font-medium mb-2">
                    Question {questionIndex + 1}
                  </label>
                  <textarea
                    rows="2"
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestionText(questionIndex, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg resize-none"
                  />
                </div>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOptionText(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="radio"
                        name={`correct-${questionIndex}`}
                        checked={question.correctAnswerIndex === optionIndex}
                        onChange={() =>
                          setCorrectAnswer(questionIndex, optionIndex)
                        }
                      />
                      <span>Correct</span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOptionToQuestion(questionIndex)}
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewQuestion}
              className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Add New Question
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </AdminLayout>
    </div>
  );
};

export default ManageQuiz;
