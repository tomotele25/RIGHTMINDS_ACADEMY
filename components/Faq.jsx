import { useState } from "react";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply click on any course you're interested in and hit the 'Enroll' button. You’ll be added to the course instantly.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes! Once you complete all lessons and pass the final quiz, you'll receive a digital certificate of completion.",
  },
  {
    question: "Is Learnova free?",
    answer:
      "Yes, most of our courses and features are completely free. Some premium content may require a subscription.",
  },
  {
    question: "How do badges work?",
    answer:
      "Badges are awarded when you complete courses, join discussions, and actively participate in the community. Flaunt them on your profile!",
  },
  {
    question: "Can I interact with other learners?",
    answer:
      "Definitely! Our discussion platform lets you connect, share insights, and grow together with other students.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-black">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          We know trying something new comes with questions. Here are the
          details you need to feel confident about using our platform.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full md:w-10/12 border border-gray-300 rounded-lg p-5 mb-4 transition duration-200 ease-in-out hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-black text-base font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
