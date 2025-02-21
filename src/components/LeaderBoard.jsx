import React, { useState, useEffect } from "react";
import api from "@/api/config";
const LeaderboardStatsTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const id = user?.id || "";
  const role = user?.role || "";

  // Fetch leaderboard data from API
  const fetchLeaderboardStats = async () => {
    try {
      const requestData = { id, role };
      const response = await api.coaches.getLeaderboardStats(requestData);
      if (response.data.success) {
        setData(response.data.leaderboard);
        setTotalPages(
          Math.ceil(response.data.leaderboard.length / itemsPerPage)
        );
      } else {
        setError("Failed to fetch leaderboard data");
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Error fetching leaderboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardStats();
  }, []);

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading)
    return <div className="p-6 text-lg text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-lg">{error}</div>;

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="px-6 py-3">Player Name</th>
              <th className="px-6 py-3">Sport</th>
              <th className="px-6 py-3">Wins</th>
              <th className="px-6 py-3">Losses</th>
              <th className="px-6 py-3">Win Rate</th>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((player, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{player.name}</td>
                <td className="px-6 py-4">{player.sport}</td>
                <td className="px-6 py-4">{player.wins}</td>
                <td className="px-6 py-4">{player.losses}</td>
                <td
                  className={`px-6 py-4 ${
                    parseFloat(player.winRate) >= 70
                      ? "text-green-500"
                      : parseFloat(player.winRate) >= 50
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {player.winRate}%
                </td>
                <td className="px-6 py-4">{player.rank}</td>
                <td className="px-6 py-4">
                  {player.connectionStatus ? (
                    <span className="text-primary font-semibold">
                      {player.connectionStatus}
                    </span>
                  ) : (
                    <span className="text-gray-400">Not connected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardStatsTable;
