import React from "react";

const CoachList = ({ coaches, activeChat, onSelectCoach }) => {
  return (
    <div className="w-full md:w-80 bg-white border-r rounded-l-lg ">
      <div className="p-4 border-b">
        <h2 className="font-bold text-primary text-xl">Your Connections</h2>
      </div>

      <div className="overflow-y-auto h-full max-h-[calc(100vh-130px)]">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            onClick={() => onSelectCoach(coach.id)}
            className={`p-4 border-b flex items-center cursor-pointer hover:bg-gray-50 ${
              activeChat === coach.id ? "bg-gray-100" : ""
            }`}
          >
            <div className="relative">
              <img
                src={coach.profileImage}
                alt={coach.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {coach.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{coach.name}</h3>
                <span className="text-xs text-gray-500">
                  {coach.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{coach.role}</p>
              <p className="text-sm text-gray-500 truncate">
                {coach.lastMessage}
              </p>
            </div>

            {coach.unread > 0 && (
              <div className="ml-2 bg-[#CDFA89] text-[#002E25] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                {coach.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachList;
