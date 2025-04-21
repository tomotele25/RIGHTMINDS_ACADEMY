import { useState } from "react";
import Layout from "@/components/Layout"; // adjust path as needed

const mockThreads = [
  {
    id: 1,
    course: "BIO 301 - Molecular Biology",
    level: "300",
    messages: [
      {
        sender: "Precious Ade",
        text: "Can someone explain gene expression again?",
        time: "10:45 AM",
      },
      {
        sender: "Tunde B.",
        text: "It’s basically how DNA is used to make proteins.",
        time: "10:47 AM",
      },
    ],
  },
  {
    id: 2,
    course: "CHM 204 - Organic Chemistry",
    level: "200",
    messages: [
      {
        sender: "Zainab Y.",
        text: "Who’s the best tutor for tomorrow’s test?",
        time: "8:21 PM",
      },
    ],
  },
];

export default function DiscussionPage() {
  const [selectedThread, setSelectedThread] = useState(mockThreads[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updatedThreads = mockThreads.map((thread) => {
      if (thread.id === selectedThread.id) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              sender: "You",
              text: newMessage,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      }
      return thread;
    });

    setSelectedThread(updatedThreads.find((t) => t.id === selectedThread.id));
    setNewMessage("");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-black px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-md p-4 h-fit md:sticky top-6 md:max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-black">
              💬 Threads
            </h2>

            <input
              type="text"
              placeholder="Search by course..."
              className="mb-4 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="space-y-2">
              {mockThreads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`cursor-pointer rounded-lg px-4 py-3 text-sm transition ${
                    selectedThread.id === thread.id
                      ? "bg-blue-100 border border-blue-300 text-blue-700"
                      : "hover:bg-gray-100 text-black"
                  }`}
                >
                  <div className="font-medium">{thread.course}</div>
                  <div className="text-xs text-gray-500">
                    {thread.level} Level
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Chat Section */}
          <main className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 flex flex-col h-[80vh]">
            {/* Header */}
            <div className="mb-4 border-b pb-3">
              <h1 className="text-2xl font-bold text-black">
                {selectedThread.course}
              </h1>
              <p className="text-sm text-gray-500">
                Join the class discussion 💬
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-5">
              {selectedThread.messages.map((msg, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img
                    src="/Ellipse 514 (6).svg"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg max-w-xl">
                    <div className="font-semibold text-black">{msg.sender}</div>
                    <p className="text-sm text-black">{msg.text}</p>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex flex-col md:flex-row gap-3 pt-3 border-t">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="mt-3 md:mt-0 md:ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
