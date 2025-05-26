"use client";
import React, { useState } from "react";

const PDFReader = () => {
  const [notes, setNotes] = useState("");

  const handleDone = () => {
    alert("Done reading! Proceed to the quiz.");
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
      >
        &larr; Back
      </button>

      {/* PDF Viewer Section */}
      <div
        className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden"
        style={{ height: "90vh" }}
      >
        <embed
          src="/sample-report.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          className="block"
          title="PDF Viewer"
        />
      </div>

      {/* Sidebar */}
      <div className="flex flex-col space-y-6">
        {/* Notes Section */}
        <div className="bg-slate-800 rounded-lg p-4 flex flex-col flex-grow">
          <h2 className="font-semibold mb-2 text-white">Your Notes</h2>
          <textarea
            rows={10}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-3 rounded-md bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
          />
        </div>

        {/* Creator Comments */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-white">Creator's Notes</h2>
          <p className="text-gray-300 text-sm">
            📌 Remember to focus on the core principles in this section. You’ll
            need them for the quiz.
          </p>
        </div>

        {/* AI Assistant Placeholder */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-white">AI Assistant</h2>
          <p className="text-gray-400 text-sm italic">
            Coming soon: Ask questions about this PDF and get instant help!
          </p>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDone}
          className="mt-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Done Reading
        </button>
      </div>
    </div>
  );
};

export default PDFReader;
