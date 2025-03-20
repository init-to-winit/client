import React from "react";
import { ArrowLeft, Phone, Video } from "lucide-react";

const ChatHeader = ({ connection }) => {
  return (
    <div className="bg-white p-4 border-b flex items-center justify-between rounded-r-lg">
      <div className="flex items-center">
        <button className="mr-3 md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={connection.profileImage || "https://via.placeholder.com/48?text=No+Image"}
          alt={connection.firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h3 className="font-medium">{connection.firstName}</h3>
          <p className="text-xs text-gray-500">{connection.role}</p>
        </div>
      </div>

      {/* <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Phone className="w-5 h-5 text-[#002E25]" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Video className="w-5 h-5 text-[#002E25]" />
        </button>
      </div> */}
    </div>
  );
};

export default ChatHeader;
