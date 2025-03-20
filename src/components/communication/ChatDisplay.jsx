import React, { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, Paperclip, ArrowLeft, Clock } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatHeader from "./ChatHeader";

const ChatDisplay = ({ coach, messages: initialMessages, onSendMessage }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(initialMessages || []);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages || []); // Sync with prop changes
  }, [initialMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      sender: "you",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    if (onSendMessage) onSendMessage(newMessage); // Notify parent component

    setMessageText("");
  };

  if (!coach) {
    return (
      <div className="flex-1 flex items-center justify-center ">
        <p className="text-gray-500">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Chat Header */}
      <ChatHeader coach={coach} />

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4  max-h-[80vh] rounded"
        style={{
          background:
            "linear-gradient(to bottom, rgba(187, 249, 94, 0.1) 0%, rgba(187, 249, 94, 0.4) 100%)",
        }}
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            coachImage={coach.profileImage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white p-3 border-t flex items-center">
        <button className="p-2 text-gray-500 hover:text-[#002E25]">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-[#002E25]/40"
        />
        <button
          onClick={handleSendMessage}
          disabled={messageText.trim() === ""}
          className={`p-2 rounded-full ${
            messageText.trim() === ""
              ? "bg-gray-200 text-gray-400"
              : "bg-[#002E25] text-white hover:bg-[#003c32]"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatDisplay;
