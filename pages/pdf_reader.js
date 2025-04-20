import Layout from "@/components/Layout";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// PDF.js worker setup
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js";

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Sample PDF URL (use a URL or local path)
  const pdfUrl = "/dummy.pdf"; // Put your own PDF URL here

  // On load success, set the total pages of the PDF
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Go to next page
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Go to previous page
  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Course Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            📘 Course PDF Viewer
          </h1>

          {/* PDF Navigation */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
            <button
              onClick={goToPreviousPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span className="text-gray-600 font-medium">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={pageNumber === numPages}
            >
              Next
            </button>
          </div>

          {/* PDF Display */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Document
              file={pdfUrl}
              onLoadSuccess={onLoadSuccess}
              className="w-full"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>

          {/* Page Progress Tracker */}
          <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              📖 Your Progress
            </h2>
            <div className="flex flex-wrap gap-2 justify-start">
              {[...Array(numPages)].map((_, i) => {
                const page = i + 1;
                const isRead = page <= pageNumber; // Highlight pages that are already viewed
                return (
                  <span
                    key={page}
                    className={`px-4 py-2 text-sm rounded-full font-medium ${
                      isRead
                        ? "bg-green-100 text-green-700 border border-green-400"
                        : "bg-gray-100 text-gray-500 border border-gray-300"
                    } transition duration-300`}
                    title={`Page ${page}`}
                  >
                    {page}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PdfViewer;
