import React, { useEffect, useState } from "react";
import api from "../api/config";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#002E25] rounded-full animate-spin"></div>
    <p className="ml-4 text-lg text-gray-600">Loading...</p>
  </div>
);

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

const PersonCard = ({
  id: receiverId,
  firstName,
  lastName,
  email,
  phone,
  sport,
  connectionStatus,
  user,
  person, // 'coaches' or 'sponsors'
}) => {
  const [status, setStatus] = useState(connectionStatus);
  const receiverRole = person === "coaches" ? "Coach" : "Sponsor"; // Dynamic role

  const handleConnect = async () => {
    if (!user) return;

    const requestData = {
      senderId: user.id,
      receiverId,
      senderRole: user.role,
      receiverRole,
    };

    try {
      await api.connect.sendConnection(requestData);
      setStatus("pending"); // Update UI optimistically
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 p-6 rounded-lg mb-8">
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
        ) : status === "rejected" ? (
          <span className="text-red-500 font-semibold">Rejected</span>
        ) : (
          <button
            onClick={handleConnect}
            className="border border-gray-800 rounded-lg py-2 px-5 text-gray-800 hover:bg-gray-50 transition"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

const SponsorsListing = ({ person }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Filter state (all, connected, pending)
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role || "";
  const id = user?.id || "";

  const fetchData = async () => {
    try {
      let res;
      const requestData = { id, role };

      if (person === "coaches") {
        res = await api.coaches.getAllCoaches(requestData);
        setData(res.data.coaches);
      } else {
        res = await api.sponsors.getAllSponsors(requestData);
        setData(res.data.sponsors);
      }

      console.log(`${person} data fetched:`, res.data);
    } catch (err) {
      console.error(`Error fetching ${person}:`, err);
      setError(err.response?.data?.message || `Failed to fetch ${person}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [person]);

  // Filtered data based on selected filter
  const filteredData =
    filter === "connected"
      ? data.filter((item) => item.connectionStatus === "accepted")
      : filter === "pending"
      ? data.filter((item) => item.connectionStatus === "pending")
      : data;

  if (loading) {
    return <LoadingSpinner />; // Display loading spinner while fetching data
  }

  if (error) {
    return <div className="p-6 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {person === "coaches" ? "Coaches" : "Sponsors"}
        </h1>

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
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <PersonCard key={item.id} {...item} user={user} person={person} />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No {person} found.</p>
        )}
      </div>
    </div>
  );
};

export default SponsorsListing;
