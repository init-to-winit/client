import React, { useState } from "react";
import { Info } from "lucide-react";
import CoachList from "@/components/communication/CoachList";
import ChatDisplay from "@/components/communication/ChatDisplay";
import initialImage from "../assets/images/profile.jpg";

// Sample data for demonstration
const COACHES = [
  {
    id: "coach1",
    name: "Sarah Johnson",
    role: "Head Coach",
    profileImage: initialImage,
    lastMessage: "How's your recovery going?",
    lastMessageTime: "10:45 AM",
    isOnline: true,
    unread: 2,
  },
  {
    id: "coach2",
    name: "Michael Roberts",
    role: "Nutrition Coach",
    profileImage: initialImage,
    lastMessage: "Your nutrition plan was updated",
    lastMessageTime: "Yesterday",
    isOnline: false,
    unread: 0,
  },
  {
    id: "coach3",
    name: "David Chen",
    role: "Strength Coach",
    profileImage: initialImage,
    lastMessage: "Ready for tomorrow's session?",
    lastMessageTime: "Wed",
    isOnline: true,
    unread: 0,
  },
];

// Message history for demonstration
const MESSAGE_HISTORY = {
  coach1: [
    {
      sender: "coach",
      text: "Hi there! How's your recovery going after last week's match?",
      time: "10:30 AM",
    },
    {
      sender: "you",
      text: "Much better today! The ice therapy helped a lot.",
      time: "10:35 AM",
    },
    {
      sender: "coach",
      text: "Great to hear! Would you be able to join light training tomorrow?",
      time: "10:36 AM",
    },
    {
      sender: "coach",
      text: "We want to make sure you're 100% before full intensity training.",
      time: "10:37 AM",
    },
    {
      sender: "you",
      text: "Yes, I think I can handle light training tomorrow. The soreness is mostly gone.",
      time: "10:40 AM",
    },
    {
      sender: "coach",
      text: "Excellent! See you at 9am. Make sure to hydrate well tonight.",
      time: "10:42 AM",
    },
    { sender: "coach", text: "How's your recovery going?", time: "10:45 AM" },
  ],
  coach2: [
    {
      sender: "coach",
      text: "I've updated your nutrition plan for the competition phase.",
      time: "Yesterday",
    },
    {
      sender: "coach",
      text: "Please check the new increased protein targets.",
      time: "Yesterday",
    },
    {
      sender: "you",
      text: "Thanks, I'll review it right away.",
      time: "Yesterday",
    },
  ],
  coach3: [
    {
      sender: "you",
      text: "Should I focus more on upper body tomorrow?",
      time: "Wed",
    },
    {
      sender: "coach",
      text: "Yes, we'll do upper body strength and some core stability work.",
      time: "Wed",
    },
    { sender: "coach", text: "Ready for tomorrow's session?", time: "Wed" },
  ],
};

export default function Communication() {
  const [activeChat, setActiveChat] = useState("coach1");
  const [messageHistory, setMessageHistory] = useState(MESSAGE_HISTORY);

  const handleChatSelect = (coachId) => {
    setActiveChat(coachId);
  };

  const handleNewMessage = (coachId, newMessage) => {
    setMessageHistory((prev) => ({
      ...prev,
      [coachId]: [...(prev[coachId] || []), newMessage],
    }));
  };

  const getActiveCoach = () => {
    return COACHES.find((coach) => coach.id === activeChat);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col rounded-lg">
      <div className="flex-1 mx-auto w-full flex flex-col md:flex-row">
        <CoachList
          coaches={COACHES}
          activeChat={activeChat}
          onSelectCoach={handleChatSelect}
        />
        <ChatDisplay
          coach={getActiveCoach()}
          messages={messageHistory[activeChat] || []}
          onSendMessage={(newMessage) =>
            handleNewMessage(activeChat, newMessage)
          }
        />
      </div>
    </div>
  );
}
