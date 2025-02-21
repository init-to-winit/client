import React, { useState, useEffect } from 'react';

const RunnerStatsTable = () => {
  // Sample data - repeating pattern of runners
  const generateData = () => {
    const baseData = [
      { name: "Richard Martin", sport: "Running", wins: 90, losses: 23, winRate: "89%" },
      { name: "Tom Homan", sport: "Running", wins: 160, losses: 6, winRate: "79%" },
      { name: "Veandir", sport: "Running", wins: 67, losses: 78, winRate: "40%" },
    ];
    
    // Create 100 entries for demonstration
    return Array(100).fill().map((_, index) => ({
      ...baseData[index % 3],
      rank: index + 1
    }));
  };
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    const allData = generateData();
    setData(allData);
    setTotalPages(Math.ceil(allData.length / itemsPerPage));
  }, [itemsPerPage]);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className="w-full mx-auto p-4">
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
            </tr>
          </thead>
          <tbody>
            {currentItems.map((player, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{player.name}</td>
                <td className="px-6 py-4">{player.sport}</td>
                <td className="px-6 py-4">{player.wins}</td>
                <td className="px-6 py-4">{player.losses}</td>
                <td className={`px-6 py-4 ${
                  parseInt(player.winRate) >= 70 ? 'text-green-500' : 
                  parseInt(player.winRate) >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {player.winRate}
                </td>
                <td className="px-6 py-4">{player.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
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
            currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RunnerStatsTable;