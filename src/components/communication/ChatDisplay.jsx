import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatHeader from './ChatHeader';

const ChatDisplay = ({
  connection,
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [wasScrolledToBottom, setWasScrolledToBottom] = useState(true);

  // Check if user was at bottom before new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isScrolledToBottom =
        container.scrollHeight - container.clientHeight <=
        container.scrollTop + 20;
      setWasScrolledToBottom(isScrolledToBottom);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages if user was already at bottom
  useEffect(() => {
    if (wasScrolledToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, wasScrolledToBottom]);

  // Always scroll to bottom when conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setWasScrolledToBottom(true);
  }, [connection?.id]);

  const handleSendMessage = async () => {
    if (messageText.trim() === '' || !connection) return;

    const newMessage = {
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      // Call the parent's onSendMessage handler
      if (onSendMessage) {
        await onSendMessage(newMessage);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }

    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!connection) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Chat Header */}
      <ChatHeader connection={connection} />

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 max-h-[80vh] rounded"
        style={{
          background:
            'linear-gradient(to bottom, rgba(187, 249, 94, 0.1) 0%, rgba(187, 249, 94, 0.4) 100%)',
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageBubble
              key={`${message.timestamp || index}`}
              message={message}
              connectionImage={connection.profileImage || ''}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">
              Start a conversation with {connection.firstName}
            </p>
          </div>
        )}
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
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-[#002E25]/40"
        />
        <button
          onClick={handleSendMessage}
          disabled={messageText.trim() === '' || isLoading}
          className={`p-2 rounded-full ${
            messageText.trim() === '' || isLoading
              ? 'bg-gray-200 text-gray-400'
              : 'bg-[#002E25] text-white hover:bg-[#003c32]'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatDisplay;
