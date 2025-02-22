import React, { useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";

const NameAvatar = ({ firstName, lastName }) => {
  const firstInitial = firstName ? firstName.charAt(0) : "";
  const lastInitial = lastName ? lastName.charAt(0) : "";
  const initials = (firstInitial + lastInitial).toUpperCase();

  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary font-medium text-lg">
      {initials}
    </div>
  );
};

const PlayerCard = ({
  id: receiverId,
  firstName,
  lastName,
  email,
  phone,
  sport,
  connectionStatus,
  user,
}) => {
  const [status, setStatus] = useState(connectionStatus);
  const navigate = useNavigate();
  const athleteId = receiverId;

  const handleConnect = async (e) => {
    e.stopPropagation(); // Prevent navigating when clicking Connect
    if (!user) return;

    const requestData = {
      senderId: user.id,
      receiverId,
      senderRole: user.role,
      receiverRole: "Player",
    };

    try {
      await api.connect.sendConnection(requestData);
      setStatus("pending");
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleNavigate = () => {
    navigate(`/athleteProfile/${athleteId}`);
  };

  return (
    <div
      className="flex items-center bg-gray-100 p-6 rounded-lg mb-8 cursor-pointer hover:bg-gray-200 transition"
      onClick={handleNavigate} // Navigate when clicking outside the button
    >
      <div className="mr-6">
        <NameAvatar firstName={firstName} lastName={lastName} />
      </div>
      <div className="flex-grow">
        <h3 className="text-primary bg-secondary inline-block px-1 text-xl font-semibold mb-2">
          {firstName} {lastName}
        </h3>
        <p className="text-ptext text-base mb-1">{email}</p>
        <p className="text-ptext text-base mb-1">{phone}</p>
        {sport && (
          <p className="px-1 inline-block rounded-md font-medium text-lg">
            {sport}
          </p>
        )}
      </div>
      <div className="flex items-center">
        {status === "accepted" ? (
          <span className="text-green-600 font-semibold">Connected</span>
        ) : status === "pending" ? (
          <span className="text-yellow-500 font-semibold">Pending</span>
        ) : (
          <button
            onClick={(e) => handleConnect(e)}
            className="border border-gray-800 rounded-lg py-2 px-5 text-gray-800 hover:bg-gray-50 transition"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Filter state: all, connected, pending
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role || "";
  const id = user?.id || "";

  const fetchPlayers = async () => {
    try {
      const requestData = { id, role };
      const res = await api.athletes.getAllAthletes(requestData);
      setPlayers(res.data.athletes);
      console.log("Players data fetched:", res.data);
    } catch (err) {
      console.error("Error fetching players:", err);
      setError(err.response?.data?.message || "Failed to fetch players");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Filter players based on selected filter
  const filteredPlayers =
    filter === "connected"
      ? players.filter((item) => item.connectionStatus === "accepted")
      : filter === "pending"
      ? players.filter((item) => item.connectionStatus === "pending")
      : players;

  if (loading) {
    return <div className="p-6 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Players</h1>

        {/* Filter Toggle Switch */}
        <div className="flex space-x-4 bg-gray-200 p-2 rounded-lg">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-gray-800 text-white" : "text-gray-800"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "connected"
                ? "bg-green-600 text-white"
                : "text-gray-800"
            }`}
            onClick={() => setFilter("connected")}
          >
            Connected
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "text-gray-800"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>

      <div>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard key={player.id} {...player} user={user} />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No players found.</p>
        )}
      </div>
    </div>
  );
};

export default Players;
