import React, { useState } from "react";

const PDFReader = () => {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Simulate AI response (replace with real API call)
  const askAI = async () => {
    // Here you would call your AI API, e.g. OpenAI
    // For demo, we fake a response
    setAiAnswer("This is a sample AI answer to your question.");
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 3 }}>
        {/* Replace with your Video or PDF Viewer */}
        <video width="100%" controls src="/sample-video.mp4" />
      </div>

      <div style={{ flex: 1 }}>
        <h3>Ask AI</h3>
        <input
          type="text"
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Ask a question about this lesson"
          style={{ width: "100%" }}
        />
        <button onClick={askAI} style={{ marginTop: "0.5rem" }}>
          Ask
        </button>
        <p>{aiAnswer}</p>

        <h3>Notes</h3>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add your note here"
          style={{ width: "100%", height: "80px" }}
        />
        <button onClick={addNote} style={{ marginTop: "0.5rem" }}>
          Add Note
        </button>

        <ul>
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PDFReader;
