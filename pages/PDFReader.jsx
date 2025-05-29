"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useRouter } from "next/navigation";

// Fix pdf.js worker error
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
export default function PDFReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [doneReading, setDoneReading] = useState(false);
  const router = useRouter();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-1 lg:grid-cols-3">
      {/* PDF Section */}
      <div className="lg:col-span-2 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 max-h-[90vh] overflow-auto">
          <Document
            file="/sample-report.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>

        {/* Done Button & Back */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row justify-between items-center">
          <button
            onClick={goBack}
            className="bg-slate-800 px-4 py-2 rounded text-white hover:bg-slate-700"
          >
            ← Go Back
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={doneReading}
              onChange={() => setDoneReading(!doneReading)}
              className="accent-green-500 w-4 h-4"
            />
            Done Reading
          </label>
        </div>
      </div>

      {/* Sidebar */}
      <div className="p-4 space-y-6">
        {/* Notes Section */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Your Notes</h2>
          <textarea
            rows={6}
            placeholder="Write your thoughts..."
            className="w-full p-2 rounded bg-gray-700 text-white resize-none outline-none"
          />
        </div>

        {/* Creator Comments */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Creator's Notes</h2>
          <p className="text-sm text-gray-300">
            📌 Focus on the key ideas here. They’ll come up in your quiz.
          </p>
        </div>

        {/* AI Assistant Placeholder */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">AI Assistant</h2>
          <p className="text-sm text-gray-400">
            Coming soon: Ask questions and get instant answers from AI!
          </p>
        </div>
      </div>
    </div>
  );
}
