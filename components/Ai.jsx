import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function Ai() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm your AI Assistant. How can I help you today?",
    },
  ]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response (replace with API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Thanks for your message! I'll get back to you shortly.",
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={toggleOpen}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition"
        >
          <FaRobot size={20} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-[480px] bg-white shadow-2xl rounded-xl flex flex-col border overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <span className="font-semibold text-sm">AI Assistant</span>
            <button onClick={toggleOpen}>
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  msg.sender === "ai"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-indigo-100 text-indigo-900 self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm border rounded-full px-3 py-2 outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
