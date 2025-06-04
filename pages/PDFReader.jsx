import React from "react";
import { useRouter } from "next/router";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfReader = () => {
  const router = useRouter();
  const { pdfUrl } = router.query;

  const goBack = () => {
    router.back();
  };

  if (!pdfUrl) {
    return <p className="text-center mt-8">Loading PDF URL...</p>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <button
        onClick={goBack}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ← Back
      </button>

      <div style={{ height: "750px", border: "1px solid #ccc" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default PdfReader;
