import React, { useEffect, useState } from "react";
import api from "../api/config";

const Requests = () => {
  const [connections, setConnections] = useState({
    sent: [],
    received: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("received");
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const id = user?.id || "";

  const fetchConnections = async () => {
    try {
      const res = await api.connect.getConnections(id);
      setConnections({
        sent: res.data.sentConnections || [],
        received: res.data.receivedConnections || [],
      });
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError(err.response?.data?.message || "Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleAction = async (senderId, action) => {
    try {
      const receiverId = id; // Receiver's ID is the current user's ID
      await api.connect.handleConnections(senderId, receiverId, action);
      setConnections((prev) => ({
        ...prev,
        received: prev.received.map((conn) =>
          conn.senderId === senderId ? { ...conn, status: action } : conn
        ),
      }));
    } catch (err) {
      console.error(`Error updating connection status:`, err);
    }
  };

  const getFilteredConnections = () => {
    const connectionsList =
      activeTab === "received" ? connections.received : connections.sent;

    if (filter === "all") return connectionsList;
    return connectionsList.filter((conn) =>
      filter === "connected"
        ? conn.status === "accepted"
        : conn.status === "pending"
    );
  };

  if (loading) {
    return <div className="p-6 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-lg">{error}</div>;
  }

  const filteredConnections = getFilteredConnections();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Connection Requests
      </h1>

      {/* Tab Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "received"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("received")}
          >
            Received Requests
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "sent"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("sent")}
          >
            Sent Requests
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 bg-gray-200 p-2 rounded-lg mb-6">
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
      {/* Connection List */}
      {filteredConnections.length > 0 ? (
        filteredConnections.map((conn) => (
          <div
            key={activeTab === "received" ? conn.senderId : conn.receiverId}
            className="flex items-center bg-gray-100 p-4 rounded-lg mb-4"
          >
            <div className="flex-grow">
              <h3 className="text-primary text-xl font-semibold">
                {activeTab === "received" ? conn.senderRole : conn.receiverRole}{" "}
                {activeTab === "received" ? "Request" : "Connection"}
              </h3>
              {/* Display person's details */}
              {activeTab === "received" && conn.senderData && (
                <div className="mt-2 text-sm">
                  <p className="text-ptext">
                    <strong className="text-primary">Name:</strong>{" "}
                    {conn.senderData.firstName} {conn.senderData.lastName}
                  </p>
                  <p className="text-ptext">
                    <strong className="text-primary">Role:</strong>{" "}
                    {conn.senderData.role}
                  </p>
                  <p className="text-ptext">
                    <strong className="text-primary">Email:</strong>{" "}
                    {conn.senderData.email}
                  </p>
                  {conn.senderData.sport && (
                    <p className="text-ptext">
                      <strong className="text-primary">Sport:</strong>{" "}
                      {conn.senderData.sport}
                    </p>
                  )}
                </div>
              )}
              {activeTab === "sent" && conn.receiverData && (
                <div className="mt-2 text-sm">
                  <p className="text-ptext">
                    <strong className="text-primary">Name:</strong>{" "}
                    {conn.receiverData.firstName} {conn.receiverData.lastName}
                  </p>
                  <p className="text-ptext">
                    <strong className="text-primary">Role:</strong>{" "}
                    {conn.receiverData.role}
                  </p>
                  <p className="text-ptext">
                    <strong className="text-primary">Email:</strong>{" "}
                    {conn.receiverData.email}
                  </p>
                  {conn.receiverData.sport && (
                    <p className="text-ptext">
                      <strong className="text-primary">Sport:</strong>{" "}
                      {conn.receiverData.sport}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center">
              {activeTab === "received" && conn.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleAction(conn.senderId, "accept")}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(conn.senderId, "reject")}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`font-semibold ${
                    conn.status === "accepted"
                      ? "text-green-600"
                      : conn.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {conn.status.charAt(0).toUpperCase() + conn.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">
          No {activeTab} connection requests{" "}
          {filter !== "all" ? `with status "${filter}"` : ""} found.
        </p>
      )}
    </div>
  );
};

export default Requests;
