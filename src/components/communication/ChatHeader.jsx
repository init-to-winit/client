import React from 'react';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import dummy from '../../assets/images/profile.jpg';
const ChatHeader = ({ connection }) => {
  return (
    <div className="bg-white p-4 border-b flex items-center justify-between rounded-r-lg">
      <div className="flex items-center">
        <button className="mr-3 md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={connection.profilePhoto || dummy}
          alt={connection.firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium">{connection.firstName}</h3>
          <p className="text-xs text-gray-500">{connection.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
