import React, { useState, useEffect } from 'react';
import CoachList from '@/components/communication/CoachList';
import ChatDisplay from '@/components/communication/ChatDisplay';
import api from '../api/config';
import { ref, onValue, off, set } from 'firebase/database';
import { database } from '@/api/firebase';

export default function Communication() {
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messageHistory, setMessageHistory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

  // Fetch initial connections
  useEffect(() => {
    if (!currentUserId) return;

    const fetchConnections = async () => {
      try {
        const response = await api.connect.getAllConnections(currentUserId);
        setConnections(response.data.users);
      } catch (error) {
        console.error('Failed to fetch connections:', error);
      }
    };
    fetchConnections();
  }, [currentUserId]);

  // Set up RTDB listener for messages when activeChat changes
  useEffect(() => {
    if (!activeChat || !currentUserId) return;

    setIsLoading(true);
    const chatRoomId = [currentUserId, activeChat].sort().join('_');
    const messagesRef = ref(database, `messages/${chatRoomId}`);

    let initialDataLoaded = false;

    // First, fetch initial messages from API
    const fetchInitialMessages = async () => {
      try {
        const response = await api.chat.getMessages(currentUserId, activeChat);

        const formattedMessages = response.data.messages.map((msg) => ({
          sender: msg.senderId === currentUserId ? 'you' : 'coach',
          text: msg.message || msg.text, // Handle both property names
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          timestamp: msg.timestamp, // Keep this for sorting
        }));

        setMessageHistory((prev) => ({
          ...prev,
          [activeChat]: formattedMessages,
        }));
        initialDataLoaded = true;
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        // Set empty array if API fails
        setMessageHistory((prev) => ({
          ...prev,
          [activeChat]: [],
        }));
        initialDataLoaded = true;
        setIsLoading(false);
      }
    };

    fetchInitialMessages();

    // Then setup listener for real-time updates
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (!initialDataLoaded) return; // Wait for initial data before processing updates

      const data = snapshot.val();
      if (data) {
        // Get current messages
        const currentMessages = messageHistory[activeChat] || [];
        const existingIds = new Set(
          currentMessages.map((msg) => msg.timestamp)
        );

        // Convert Firebase data to our message format
        const firebaseMessages = Object.values(data).map((msg) => ({
          sender: msg.senderId === currentUserId ? 'you' : 'coach',
          text: msg.text || msg.message, // Handle both property names
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          timestamp: msg.timestamp,
        }));

        // Merge existing messages with new ones, avoiding duplicates
        const mergedMessages = [...currentMessages];

        firebaseMessages.forEach((fbMsg) => {
          if (!existingIds.has(fbMsg.timestamp)) {
            mergedMessages.push(fbMsg);
          }
        });

        // Sort by timestamp
        mergedMessages.sort((a, b) => a.timestamp - b.timestamp);

        setMessageHistory((prev) => ({
          ...prev,
          [activeChat]: mergedMessages,
        }));
      }
    });

    return () => {
      off(messagesRef);
    };
  }, [activeChat, currentUserId]);

  const handleChatSelect = (targetUserId) => {
    setActiveChat(targetUserId);
    // The useEffect above will handle fetching messages when activeChat changes
  };

  const handleNewMessage = async (targetUserId, newMessage) => {
    if (!currentUserId || !targetUserId) return;

    const chatRoomId = [currentUserId, targetUserId].sort().join('_');
    const timestamp = Date.now();
    const messageRef = ref(database, `messages/${chatRoomId}/${timestamp}`);

    // Add to local state immediately for responsive UI
    const optimisticMessage = {
      sender: 'you',
      text: newMessage.text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: timestamp,
    };

    setMessageHistory((prev) => ({
      ...prev,
      [targetUserId]: [...(prev[targetUserId] || []), optimisticMessage],
    }));

    const messageData = {
      senderId: currentUserId,
      text: newMessage.text,
      message: newMessage.text, // Include both formats to be safe
      timestamp: timestamp,
    };

    try {
      // Write directly to Firebase
      await set(messageRef, messageData);

      // Also send to your backend API
      await api.chat.sendMessage(
        {
          senderId: currentUserId,
          receiverId: targetUserId,
          message: newMessage.text,
        },
        targetUserId
      );

      return true;
    } catch (error) {
      console.error('Failed to send message:', error);

      // Remove the optimistic message on error
      setMessageHistory((prev) => ({
        ...prev,
        [targetUserId]: (prev[targetUserId] || []).filter(
          (msg) => msg.timestamp !== timestamp
        ),
      }));

      return false;
    }
  };

  const filteredConnections =
    connections?.filter(
      (coach) =>
        coach.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col rounded-lg">
      <div className="flex-1 mx-auto w-full flex flex-col md:flex-row">
        <CoachList
          connections={filteredConnections}
          activeChat={activeChat}
          onSelectConnection={handleChatSelect}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <ChatDisplay
          connection={connections.find(
            (connection) => connection.id === activeChat
          )}
          messages={messageHistory[activeChat] || []}
          onSendMessage={(newMessage) =>
            handleNewMessage(activeChat, newMessage)
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
