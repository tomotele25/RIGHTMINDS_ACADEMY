import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";

const BACKENDURL =
  "https://rightmindsbackend.vercel.app" || "http://localhost:5001";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getQuiz/${id}`);
        if (response.data.success && response.data.data) {
          setQuiz(response.data.data);
        }
      } catch {
        // silently fail or handle as needed
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, answer) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!session?.user) {
      alert("Please login to submit the quiz.");
      return;
    }

    const studentId = session.user.id;

    const answers = Object.entries(selectedAnswers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      })
    );

    if (answers.length === 0) {
      alert("Please answer at least one question.");
      return;
    }

    try {
      const response = await axios.post(`${BACKENDURL}/api/submitQuiz`, {
        quizId: id,
        studentId,
        answers,
      });

      const data = response.data;

      if (data.success) {
        setSubmitted(true);
        setModalContent(
          `Quiz submitted!\n\n✅ Correct answers: ${data.correctAnswers}\n❌ Wrong answers: ${data.wrongAnswers}\n🎯 Score: ${data.percentage}%`
        );
        setModalOpen(true);
      } else {
        alert("Quiz submitted, but no results received.");
      }
    } catch (error) {
      alert("Failed to submit quiz. Please try again.");
    }
  };

  // Retake quiz: reset state and close modal
  const handleRetake = () => {
    setSubmitted(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setModalOpen(false);
    setModalContent("");
  };

  // Go to quiz listing page
  const handleGoToQuizList = () => {
    router.push("/Quiz");
  };

  // Share results text (fallback to clipboard if no share API)
  const handleShareResult = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Quiz Results: ${quiz.title}`,
          text: modalContent.replace(/\n/g, "\n"),
        })
        .catch(() => alert("Sharing failed or cancelled"));
    } else {
      navigator.clipboard.writeText(modalContent).then(() => {
        alert("Results copied to clipboard!");
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6 sm:p-2 flex flex-col items-center">
        {/* Back button */}
        <button
          onClick={handleGoToQuizList}
          className="self-start mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-semibold text-gray-700 transition"
        >
          ← Back to Quizzes
        </button>

        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">
          {quiz.title}
        </h1>
        <p className="mb-10 max-w-3xl text-center text-gray-600 leading-relaxed px-4">
          {quiz.description || "Answer the following questions:"}
        </p>

        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg ring-1 ring-gray-200 p-8">
          <p className="text-2xl font-semibold mb-6 text-gray-800">
            {currentQuestion.question}
          </p>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const userAnswer = selectedAnswers[currentQuestion._id];
              const showResults = submitted && userAnswer !== undefined;

              let optionClass =
                "flex items-center cursor-pointer select-none rounded-lg border border-gray-300 px-4 py-3 transition-shadow duration-200";

              if (showResults) {
                if (option === currentQuestion.correctAnswer) {
                  optionClass +=
                    " bg-green-100 border-green-400 text-green-900 font-semibold shadow-md";
                } else if (
                  option === userAnswer &&
                  option !== currentQuestion.correctAnswer
                ) {
                  optionClass +=
                    " bg-red-100 border-red-400 text-red-900 font-semibold shadow-md";
                } else {
                  optionClass += " bg-white text-gray-800";
                }
              } else {
                optionClass += " hover:bg-indigo-50 hover:border-indigo-400";
              }

              return (
                <label key={option} className={optionClass}>
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    value={option}
                    checked={userAnswer === option}
                    onChange={() =>
                      handleAnswerSelect(currentQuestion._id, option)
                    }
                    disabled={submitted}
                    className="mr-3 cursor-pointer"
                  />
                  {option}
                </label>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2 rounded-md font-semibold transition ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Previous
            </button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={
                  submitted || Object.keys(selectedAnswers).length === 0
                }
                className={`px-5 py-2 rounded-md font-semibold transition ${
                  submitted || Object.keys(selectedAnswers).length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 px-4">
            <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-xl ring-1 ring-gray-300 text-center relative">
              {/* Congratulatory badge */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-lg text-lg tracking-wide select-none">
                  🎉 Congrats! 🎉
                </div>
              </div>

              <p className="whitespace-pre-line mb-8 text-lg text-gray-900">
                {modalContent}
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={handleShareResult}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Share Result
                </button>

                <button
                  onClick={handleRetake}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Retake Quiz
                </button>

                <button
                  onClick={handleGoToQuizList}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Go to Quiz List
                </button>

                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-red-300 text-red-700 rounded-lg hover:bg-red-400 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;
