import React, { useState, useRef, useEffect } from 'react';
import api from '../api/config';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your personal AI Assistant SlothPilot.",
      time: '10:25',
    },
  ]);
  const athleteId = JSON.parse(localStorage.getItem('user'))?.id;
  const [newMessage, setNewMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messageIdRef = useRef(2);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messageIdRef.current++,
        sender: 'user',
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage('');
      setIsBotTyping(true);

      try {
        const response = await api.user.getMessage(athleteId, newMessage);
        console.log(response);
        if (!response.data.success) {
          throw new Error('Network response was not ok');
        }

        const botMessage = {
          id: messageIdRef.current++,
          sender: 'bot',
          text: response.data.response,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error fetching response from API:', error);
        setMessages((prev) => [
          ...prev,
          {
            id: messageIdRef.current++,
            sender: 'bot',
            text: 'Sorry, I encountered an error while processing your request.',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto bg-green-50 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 bg-green-50 border-b border-green-100">
        <h1 className="text-xl font-bold text-green-900">Chat Bot</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-xs">AI</span>
              </div>
            )}

            <div
              className={`max-w-xs md:max-w-md ${
                message.sender === 'user'
                  ? 'bg-green-300 rounded-l-lg rounded-br-lg'
                  : 'bg-white rounded-r-lg rounded-bl-lg'
              } p-3 shadow-sm`}
            >
              {message.text && !message.audio && !message.link && (
                <div className="whitespace-pre-line text-sm">
                  {message.text}
                </div>
              )}

              <div className="text-right mt-1">
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 flex-shrink-0">
                <span className="text-xs text-white">U</span>
              </div>
            )}
          </div>
        ))}
        {isBotTyping && (
          <div className="flex mb-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">AI</span>
            </div>
            <div className="bg-white rounded-r-lg rounded-bl-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Message to slothpilot..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="flex ml-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center ml-2"
              onClick={handleSend}
            >
              Send
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
