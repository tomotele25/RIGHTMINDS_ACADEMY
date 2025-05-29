import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";

const BACKENDURL = "http://localhost:5001";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flipped, setFlipped] = useState(false); // card flipped state

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/getQuiz/${id}`);
        setQuiz(response.data);
      } catch {
        setError("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    setFlipped(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log("User answers:", selectedAnswers);
    alert("Quiz submitted! Check console for answers.");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        {loading ? (
          <p className="text-black text-center mt-10">Loading quiz...</p>
        ) : error ? (
          <p className="text-red-600 text-center mt-10">{error}</p>
        ) : !quiz ? (
          <p className="text-black text-center mt-10">No quiz found.</p>
        ) : !currentQuestion ? (
          <p className="text-black text-center mt-10">Invalid question data.</p>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-black">{quiz.title}</h1>
            <p className="mb-6 max-w-xl text-center text-black opacity-80">
              {quiz.description || "Answer the following questions:"}
            </p>

            {/* Flashcard Container */}
            <div
              className={`relative w-96 h-64 cursor-pointer perspective`}
              onClick={() => setFlipped((f) => !f)}
              aria-label="Flashcard - Click to flip"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
            >
              {/* Card Inner */}
              <div
                className={`relative w-full h-full text-black duration-700 transform-style-preserve-3d ${
                  flipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front side */}
                <div className="absolute backface-hidden w-full h-full bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center p-6">
                  <p className="text-xl font-semibold text-center">
                    {currentQuestion.question}
                  </p>
                  <p className="mt-4 italic text-gray-500 text-sm">
                    Click card to see options
                  </p>
                </div>

                {/* Back side */}
                <div className="absolute backface-hidden w-full h-full bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col justify-center p-6 rotate-y-180">
                  <p className="text-lg font-semibold mb-4 text-center">
                    Select your answer:
                  </p>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center cursor-pointer select-none"
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion._id}`}
                          value={option}
                          checked={
                            selectedAnswers[currentQuestion._id] === option
                          }
                          onChange={() =>
                            handleAnswerSelect(currentQuestion._id, option)
                          }
                          className="mr-3 accent-indigo-600"
                        />
                        <span className="text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-400 italic text-center">
                    Click card to go back to question
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between w-96">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-5 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </Layout>
  );
};

export default QuizPage;
