import Layout from "@/components/Layout";
import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

export default function Ai_Assistant() {
  const [open, setOpen] = useState(true); // open by default on page
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your AI Assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleOpen = () => setOpen((prev) => !prev);

  // Copy text to clipboard and show check icon briefly
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      // Call your AI API here
      // Example with dummy delayed response (replace with real API call)
      const userInput = input;
      // simulate API delay
      await new Promise((res) => setTimeout(res, 1500));
      const aiResponse = `You said: "${userInput}". This is a demo response. Replace with your API.`;

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full bg-gray-50">
        {/* Header */}
        <header className="bg-indigo-600 text-white p-4 flex items-center justify-between shadow-md">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <FaRobot /> AI Assistant
          </h1>
          <button
            onClick={toggleOpen}
            aria-label={open ? "Close chat" : "Open chat"}
            className="p-2 rounded hover:bg-indigo-500 transition"
          >
            {open ? <FaTimes size={20} /> : <FaRobot size={20} />}
          </button>
        </header>

        {/* Chat window */}
        {open && (
          <main className="flex flex-col flex-1 max-w-4xl mx-auto w-full bg-white shadow-lg rounded-b-lg overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`relative max-w-[75%] px-4 py-3 rounded-lg break-words ${
                    msg.sender === "ai"
                      ? "bg-white text-gray-800 self-start shadow"
                      : "bg-indigo-600 text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                  {/* Copy icon */}
                  <button
                    onClick={() => copyToClipboard(msg.text, i)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600"
                    aria-label="Copy message"
                  >
                    {copiedIndex === i ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!loading) handleSend();
              }}
              className="flex items-center border-t border-gray-300 px-4 py-3 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="ml-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-full p-3 flex items-center justify-center transition"
                aria-label="Send message"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </form>
          </main>
        )}

        {/* If chat closed */}
        {!open && (
          <div className="flex justify-center items-center flex-grow bg-gray-50">
            <p className="text-gray-500 select-none">Chat is closed</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
