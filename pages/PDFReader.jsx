"use client";
import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// WORKER CONFIGURATION - This is the most reliable way
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(800);

  // Update width when container size changes
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample PDF - make sure this path is correct
  const pdfUrl = "/sample-report.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("PDF load error:", error);
    setError("Failed to load PDF. Please check the file path and try again.");
    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Controls */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {pageNumber} of {numPages || "..."}
          </span>

          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* PDF Container */}
        <div
          ref={containerRef}
          className="flex justify-center p-4 min-h-[70vh]"
        >
          {isLoading && !error && (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p>Loading PDF document...</p>
            </div>
          )}

          {error && (
            <div className="text-center p-8">
              <div className="text-red-500 text-lg font-medium mb-2">
                {error}
              </div>
              <p className="text-gray-600">Please ensure:</p>
              <ul className="list-disc text-left inline-block text-gray-600">
                <li>The PDF file exists in your public folder</li>
                <li>The file path is correct</li>
                <li>The PDF is not password protected</li>
              </ul>
            </div>
          )}

          {!isLoading && !error && (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p>Initializing PDF viewer...</p>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={width}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={
                  <div className="flex items-center justify-center">
                    <p>Rendering page {pageNumber}...</p>
                  </div>
                }
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
