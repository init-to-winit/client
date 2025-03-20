import React, { useState, useEffect } from "react";
import CoachList from "@/components/communication/CoachList";
import ChatDisplay from "@/components/communication/ChatDisplay";
import api from "../api/config"; // Ensure axios is configured

export default function Communication() {
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messageHistory, setMessageHistory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

  // ✅ Fetch the list of connections dynamically
  useEffect(() => {
    const fetchconnections = async () => {
      try {
        const response = await api.user.getAllUsers();
        // console.log("connections fetched:", response.data)
        setConnections(response.data.users);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchconnections();
  }, []);

  const handleChatSelect = async (targetUserId) => {
    setActiveChat(targetUserId);
    // console.log("Opening chat with user ID:", targetUserId);
  
    if (!messageHistory[targetUserId]) {
      try {
        const response = await api.chat.getMessages(currentUserId, targetUserId);
  
        const formattedMessages = response.data.messages.map((msg) => ({
          sender: msg.senderId === currentUserId ? "you" : "coach", // Identify sender
          text: msg.message,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
  
        setMessageHistory((prev) => ({
          ...prev,
          [targetUserId]: formattedMessages,
        }));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }
  };
  

  // ✅ Handle sending a new message
  const handleNewMessage = async (targetUserId, newMessage) => {
    setMessageHistory((prev) => ({
      ...prev,
      [targetUserId]: [...(prev[targetUserId] || []), newMessage],
    }));

    try {
      await api.user.sendMessage(targetUserId, { text: newMessage.text });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };


  // ✅ Filter connections based on search
  const filteredconnections = connections?.filter(
    (coach) =>
      coach.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Find the active coach by ID
  const activeCoach = connections.find((coach) => coach.id === activeChat);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col rounded-lg">
      <div className="flex-1 mx-auto w-full flex flex-col md:flex-row">
        {/* Coach List with Search */}
        <CoachList
          connections={filteredconnections}
          activeChat={activeChat}
          onSelectconnection={handleChatSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Chat Display */}
        <ChatDisplay
          connection={connections?.find((connection) => connection.id === activeChat)}
          messages={messageHistory[activeChat]}
          onSendMessage={(newMessage) =>
            handleNewMessage(activeChat, newMessage)
          }
        />
      </div>
    </div>
  );
}
