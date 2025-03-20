import React from 'react';
import dummy from '../../assets/images/profile.jpg';
const CoachList = ({
  connections,
  activeChat,
  onSelectConnection,
  searchTerm,
  onSearchChange,
}) => {
  // console.log("connections: ehdvvdu", connections);
  return (
    <div className="w-full md:w-80 bg-white border-r rounded-l-lg">
      {/* 🔍 Search Input */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ✅ connections List */}
      <div className="overflow-y-auto h-full max-h-[calc(100vh-130px)]">
        {connections?.length > 0 ? (
          connections.map((connection) => (
            <div
              key={connection.id}
              onClick={() => onSelectConnection(connection.id)}
              className={`p-4 border-b flex items-center cursor-pointer hover:bg-gray-50 ${
                activeChat === connection.id ? 'bg-gray-100' : ''
              }`}
            >
              {/* ✅ Profile Image and Online Status */}
              <div className="relative">
                <img
                  src={connection.profilePhoto || dummy}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* ✅ connection Info */}
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">
                    {connection.firstName} {connection.lastName}
                  </h3>
                  {/* <span className="text-xs text-gray-500">
                    {connection.lastMessageTime || "N/A"}
                  </span> */}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {connection.role}
                </p>
                {/* <p className="text-sm text-gray-500 truncate">
                  {connection.lastMessage || "No recent message"}
                </p> */}
              </div>

              {/* ✅ Unread Message Badge */}
              {/* {connection.unread > 0 && (
                <div className="ml-2 bg-[#CDFA89] text-[#002E25] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {connection.unread}
                </div>
              )} */}
            </div>
          ))
        ) : (
          <div className="w-full text-center mt-8 text-gray-500">
            No connections Found
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachList;
