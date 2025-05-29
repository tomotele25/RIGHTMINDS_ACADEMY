import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BACKENDURL = "http://localhost:5001";

export default function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  const [newQuiz, setNewQuiz] = useState({
    title: "",
    course: "",
    department: "",
    level: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/getAllQuiz`);
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
        toast.error("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/departments`);
        setDepartments(res.data);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };

    const fetchLevels = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/levels`);
        setLevels(res.data);
      } catch (error) {
        console.error("Failed to fetch levels", error);
      }
    };

    fetchDepartments();
    fetchLevels();
  }, []);

  const createOrUpdateQuiz = async () => {
    if (
      !newQuiz.title ||
      !newQuiz.course ||
      !newQuiz.department ||
      !newQuiz.level ||
      newQuiz.questions.length === 0
    ) {
      toast.error(
        "Please fill in all quiz fields and add at least one question."
      );
      return;
    }

    const payload = {
      title: newQuiz.title,
      course: newQuiz.course,
      department: newQuiz.department,
      level: newQuiz.level,
      questions: newQuiz.questions,
    };

    try {
      if (editIndex !== null) {
        const quizToEdit = quizzes[editIndex];
        const response = await axios.put(
          `${BACKENDURL}/api/quiz/${quizToEdit._id}`,
          payload
        );

        if (response.data.success) {
          const updatedQuizzes = [...quizzes];
          updatedQuizzes[editIndex] = response.data.data;
          setQuizzes(updatedQuizzes);
          toast.success("Quiz updated successfully!");
        } else {
          toast.error(response.data.message || "Failed to update quiz.");
        }
      } else {
        const response = await axios.post(
          `${BACKENDURL}/api/createQuiz`,
          payload
        );

        if (response.data.success) {
          toast.success("Quiz created successfully!");
          setQuizzes([...quizzes, response.data.data]);
        } else {
          toast.error(response.data.message || "Failed to create quiz.");
        }
      }

      setNewQuiz({
        title: "",
        course: "",
        department: "",
        level: "",
        questions: [],
      });
      setEditIndex(null);
      setFormVisible(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the quiz.");
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.answer) {
      toast.error("Please fill in the question text and the correct answer.");
      return;
    }

    const questionToAdd = { ...newQuestion };
    if (newQuestion.type === "short-answer") {
      questionToAdd.options = [];
    }

    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, questionToAdd],
    });
    setNewQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
    toast.success("Question added!");
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions.splice(index, 1);
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
    toast.info("Question removed.");
  };

  const handleEditQuiz = (index) => {
    const quiz = quizzes[index];
    setNewQuiz(quiz);
    setFormVisible(true);
    setEditIndex(index);
  };

  // Filter quizzes based on selected department and level
  const filteredQuizzes = quizzes.filter((quiz) => {
    return (
      (filterDepartment === "" || quiz.department === filterDepartment) &&
      (filterLevel === "" || quiz.level === filterLevel)
    );
  });

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Manage Quizzes
          </h1>
          <button
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
            onClick={() => {
              setFormVisible(!formVisible);
              setNewQuiz({
                title: "",
                course: "",
                department: "",
                level: "",
                questions: [],
              });
              setEditIndex(null);
            }}
          >
            <FaPlusCircle className="text-lg" />
            {formVisible ? "Close Form" : "Add New Quiz"}
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="border border-gray-300 rounded-lg p-3"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg p-3"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            {levels.map((lvl) => (
              <option key={lvl._id} value={lvl.name}>
                {lvl.name}
              </option>
            ))}
          </select>

          {(filterDepartment || filterLevel) && (
            <button
              onClick={() => {
                setFilterDepartment("");
                setFilterLevel("");
              }}
              className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {formVisible && (
          <div className="mb-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            {/* ... form inputs and question adding (unchanged from previous code) */}
            {/* ... same as before, omitted here for brevity */}
            {/* I can add full form code here if you want */}
          </div>
        )}

        {/* Card layout for quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.length === 0 && (
            <p className="text-gray-600 col-span-full text-center">
              No quizzes found for selected filters.
            </p>
          )}
          {filteredQuizzes.map((quiz, index) => (
            <div
              key={quiz._id}
              className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Course:</strong> {quiz.course}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Department:</strong> {quiz.department}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Level:</strong> {quiz.level}
                </p>
              </div>
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => handleEditQuiz(index)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit quiz"
                >
                  <FaEdit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
