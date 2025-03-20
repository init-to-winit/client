import React from "react";
import { Clock } from "lucide-react";

const MessageBubble = ({ message, coachImage }) => {
  console.log(message);
  const isUserMessage = message.sender === "you";

  return (
    <div
      className={`mb-4 flex ${isUserMessage ? "justify-end" : "justify-start"}`}
    >
      {!isUserMessage && (
        <img
          src={coachImage}
          alt="Coach"
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}

      <div
        className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
          isUserMessage
            ? "bg-[#CDFA89] text-[#002E25]"
            : "bg-white text-gray-800"
        } shadow`}
      >
        <p>{message.text}</p>
        <div
          className={`text-xs mt-1 ${
            isUserMessage ? "text-[#002E25]/70" : "text-gray-500"
          } flex items-center`}
        >
          <Clock className="w-3 h-3 mr-1" />
          {message.time}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
