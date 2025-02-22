import React, { useEffect, useState } from "react";
import api from "../api/config";

const Requests = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const id = user?.id || "";

  const fetchConnections = async () => {
    try {
      const res = await api.connect.getConnections(id);
      setConnections(res.data.receivedConnections);
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError(err.response?.data?.message || "Failed to fetch requests");
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
      await api.connect.handleConnections({
        senderId: senderId,
        receiverId: receiverId,
        action: action, // Using 'action' as expected by the backend
      });
      setConnections((prev) =>
        prev.map((conn) =>
          conn.senderId === senderId ? { ...conn, status: action } : conn
        )
      );
    } catch (err) {
      console.error(`Error updating connection status:`, err);
    }
  };

  if (loading) {
    return <div className="p-6 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Connection Requests
      </h1>

      {connections.length > 0 ? (
        connections.map((conn) => (
          <div
            key={conn.senderId}
            className="flex items-center bg-gray-100 p-4 rounded-lg mb-4"
          >
            <div className="flex-grow">
              <h3 className="text-primary text-xl font-semibold">
                {conn.senderRole} Request
              </h3>
              <p className="text-ptext text-sm">Sender ID: {conn.senderId}</p>
              <p className="text-ptext text-sm">Status: {conn.status}</p>
              {/* <p className="text-ptext text-sm">Status: {conn.senderData}</p> */}
            </div>
            <div className="flex items-center">
              {conn.status === "pending" ? (
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
                      : "text-red-500"
                  }`}
                >
                  {conn.status.charAt(0).toUpperCase() + conn.status.slice(1)}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">No connection requests found.</p>
      )}
    </div>
  );
};

export default Requests;
