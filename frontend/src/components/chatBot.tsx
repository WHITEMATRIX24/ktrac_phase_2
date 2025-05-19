"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./chatBot.module.css";

const sampleQA = [
  {
    question: "Which is the best performig depo of the month May 2025",
    answer: "Kozhikode with revenue of 120000",
  },
  {
    question: "How to contact support?",
    answer: "You can email us at support@example.com",
  },
  {
    question: "Where can I find my profile?",
    answer: "Click on the top-right avatar to access your profile.",
  },
  {
    question: "What is the total revenue on 18th may 2025?",
    answer: "2,58,325",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);

  // Clear chat when closing modal
  const closeChat = () => {
    setIsOpen(false);
    setChat([{ from: "bot", text: "Hi there! How can I help you today?" }]);
    setInput("");
    setShowTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { from: "user", text: input };
    const matchedQA = sampleQA.find(
      (qa) => qa.question.toLowerCase() === input.toLowerCase()
    );

    setChat((prev) => [...prev, newUserMessage]);
    setShowTyping(true);
    setInput("");

    setTimeout(() => {
      const botResponse = matchedQA
        ? { from: "bot", text: matchedQA.answer }
        : { from: "bot", text: "Sorry, I'm not able to fetch that right now." };
      setChat((prev) => [...prev, botResponse]);
      setShowTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Avatar */}
      {!isOpen && (
        <div
          className={`cursor-pointer w-[100px] h-[100px] transition-all ${styles.shake}`}
          onClick={() => setIsOpen(true)}
        >
          <Image
            src="/elephant.png"
            alt="Chatbot Avatar"
            width={100}
            height={100}
            className="drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
          />
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 ${styles.fadeIn}`}
        >
          <div className="bg-white w-[90%] max-w-md rounded-xl shadow-2xl p-4 relative animate-slideUp flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-300">
              <div className="rounded-full overflow-hidden w-12 h-12 shadow-md">
                <Image
                  src="/elephant.png"
                  alt="Chatbot Avatar"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-xl font-semibold">Your AI Assistant</h3>
              <button
                onClick={closeChat}
                className="ml-auto text-gray-500 hover:text-black text-2xl font-bold leading-none"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>

            {/* Chat messages container */}
            <div className="flex-1 h-64 overflow-y-auto space-y-2 mb-4 px-1">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`text-[12px] px-2 py-2 rounded-[5px] max-w-[80ch] w-fit animate-fadeBounce ${msg.from === "bot"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-[#235789] text-white self-end ml-auto"
                    }`}
                >
                  {msg.text}
                </div>
              ))}

              {showTyping && (
                <div className="text-sm px-3 py-2 rounded-lg bg-gray-100 text-gray-800 max-w-[60%] animate-pulse">
                  Typing...
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-[12px] focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-[#235789] text-white text-[12px] px-4 py-2 rounded-[5px] hover:bg-blue-900 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
