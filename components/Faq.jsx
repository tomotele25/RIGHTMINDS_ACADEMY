import { useState } from "react";
const faqs = [
  {
    question: "How do I get started?",
    answer:
      "Click on “Get Started” and follow the sign-up steps. It’s quick and straightforward.",
  },
  {
    question: "Is this platform free?",
    answer:
      "Yes, there’s a free version available. We also have paid plans for more advanced features.",
  },
  {
    question: "Can I use this for both B2B and B2C?",
    answer:
      "Absolutely. It’s designed to support both business-to-business and business-to-consumer sales.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // close if same question is clicked again
    } else {
      setOpenIndex(index); // open the clicked question
    }
  };

  return (
    <div className="bg-white p-8  space-y-4">
      <span className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-black text-2xl text-nowrap">
          Frequently asked questions
        </h1>
        <p className="md:w-1/2 text-black text-center text-sm">
          We know trying something new comes with questions. Here are the
          details you need to feel confident about using our platform.
        </p>
      </span>
      <div className=" flex w-full items-center  flex-col justify-center">
        {faqs.map((faq, index) => (
          <div className="border-2  w-full md:w-10/12  rounded-lg border-black p-4 mb-4 cursor-pointer">
            <div
              key={index}
              className=" flex justify-between items-center "
              onClick={() => {
                toggleFAQ(index);
                setIsopen(true);
              }}
            >
              <h4 className="text-black">{faq.question}</h4>
              <span className="text-xl text-black">{isOpen ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <p style={{ marginTop: "0.5rem" }} className="text-black">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

// import React from "react";
// import { useState } from "react";
// const faqs = [
//   {
//     question: "How do I get started?",
//     answer:
//       "Click on “Get Started” and follow the sign-up steps. It’s quick and straightforward.",
//   },
//   {
//     question: "Is this platform free?",
//     answer:
//       "Yes, there’s a free version available. We also have paid plans for more advanced features.",
//   },
//   {
//     question: "Can I use this for both B2B and B2C?",
//     answer:
//       "Absolutely. It’s designed to support both business-to-business and business-to-consumer sales.",
//   },
// ];

// const Faq = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     if (openIndex === index) {
//       setOpenIndex(null); // close if same question is clicked again
//     } else {
//       setOpenIndex(index); // open the clicked question
//     }
//   };

//   return (
//     <div className="grid gap-10">
//       <span className="flex justify-center  flex-col items-center pt-20">
//         <h1> Frequently asked questions</h1>
//         <p>
//           We know trying something new comes with questions. Here are the
//           details you need to feel confident about using our platform.
//         </p>
//       </span>
//       <span>
//         {faqs.map((faq, index) => {
//           return (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 padding: "1rem",
//                 marginBottom: "1rem",
//                 cursor: "pointer",
//               }}
//               onClick={() => toggleFAQ(index)}
//             >
//               <h4>{faq.question}</h4>
//               {openIndex === index && (
//                 <p style={{ marginTop: "0.5rem" }}>{faq.answer}</p>
//               )}
//             </div>
//           );
//         })}
//       </span>
//     </div>
//   );
// };

// export default Faq;
