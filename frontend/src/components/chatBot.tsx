"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./chatBot.module.css";
const sampleQA = [
  {
    question: "Which is the best performing depot of the month May 2025?",
    answer: "Kozhikode with a revenue of ₹1,20,000",
  },
  {
    question: "What is the total revenue on 18th May 2025?",
    answer: "₹2,58,325",
  },
  {
    question: "How many trips were completed on 15th May 2025?",
    answer: "164 trips were successfully completed.",
  },
  {
    question: "Which route generated the highest revenue in May 2025?",
    answer:
      "Ernakulam to Thiruvananthapuram route generated the highest revenue of ₹85,000.",
  },
  {
    question: "How many buses were under maintenance on 17th May 2025?",
    answer: "12 buses were under maintenance on that day.",
  },
  {
    question:
      "What was the average occupancy rate for the Thrissur depot in May?",
    answer: "The average occupancy rate was 87%.",
  },
  {
    question: "List all depots with revenue above ₹1,00,000 for May 2025.",
    answer:
      "Kozhikode, Ernakulam, and Thiruvananthapuram depots reported revenues above ₹1,00,000.",
  },
  {
    question: "Which day in May 2025 had the lowest revenue?",
    answer: "7th May 2025 had the lowest revenue with ₹78,450.",
  },
  {
    question: "Count of passengers on 16th May 2025?",
    answer: "4,365",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    {
      from: "bot",
      text: "Hi there! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);

  // Clear chat when closing modal
  const closeChat = () => {
    setIsOpen(false);
    setChat([
      {
        from: "bot",
        text: "Hi there! How can I help you today?",
      },
    ]);
    setInput("");
    setShowTyping(false);
  };

  // const handleSend = () => {
  //   if (!input.trim()) return;

  //   const newUserMessage = { from: "user", text: input };
  //   const matchedQA = sampleQA.find(
  //     (qa) => qa.question.toLowerCase() === input.toLowerCase()
  //   );

  //   setChat((prev) => [...prev, newUserMessage]);
  //   setShowTyping(true);
  //   setInput("");

  //   setTimeout(() => {
  //     const botResponse = matchedQA
  //       ? { from: "bot", text: matchedQA.answer }
  //       : { from: "bot", text: "Sorry, I'm not able to fetch that right now." };
  //     setChat((prev) => [...prev, botResponse]);
  //     setShowTyping(false);
  //   }, 1000);
  // };

  const handleSend = async () => {
    try {
      !showTyping && setShowTyping(true);

      const responseFromChatBot = await fetch("/api/chatBot", {
        method: "POST",
        body: JSON.stringify({ query: input }),
      });
      const data = await responseFromChatBot.json();

      if (!responseFromChatBot.ok) {
        setChat((prevChat) => [
          ...prevChat,
          {
            from: "bot",
            text: data.error || "something went wrong",
          },
        ]);
        return;
      }
      setInput("");
      setChat((prevChat) => [
        ...prevChat,
        {
          from: "user",
          text: input,
        },
        {
          from: "bot",
          text: data.result,
        },
      ]);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setShowTyping(false);
    }
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
            <div className="flex flex-col gap-3 h-64 overflow-y-scroll overflow-x-hidden space-y-2 mb-4 px-1">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`text-[12px] px-2 py-2 rounded-[5px] max-w-[80ch] w-fit animate-fadeBounce ${
                    msg.from === "bot"
                      ? "bg-gray-100 text-gray-800 self-start flex flex-col gap-2"
                      : "bg-[#235789] text-white self-end ml-auto"
                  }`}
                >
                  {Array.isArray(msg.text) ? (
                    <div className="max-h-32 overflow-auto">
                      <table className="border-collapse w-full">
                        <thead>
                          <tr>
                            {Object.keys(msg.text[0]).map((key) => (
                              <th key={key} className="border p-2">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {msg.text.map((item, index) => (
                            <tr key={index}>
                              {Object.values(item).map((value: any, idx) => (
                                <td key={idx} className="border p-2">
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : typeof msg.text === "string" ? (
                    <p className="p-1">{msg.text}</p>
                  ) : (
                    typeof msg.text === "number" && (
                      <p className="p-1">{`${msg.text}`}</p>
                    )
                  )}
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
