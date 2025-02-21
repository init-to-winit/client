import Cards from "@/components/performanceDashboard/Cards";
import PerformanceChart from "@/components/performanceDashboard/PerformanceChart";
import PracticeSessionsChart from "@/components/performanceDashboard/PerformanceLineChart";
import PerformanceSuggestions from "@/components/performanceDashboard/Suggestions";
import React, { useEffect, useState } from "react";
import Matches from "../assets/images/Matches.png";
import Wins from "../assets/images/Wins.png";
import Losses from "../assets/images/Losses.png";
import Winrate from "../assets/images/Winrate.png";
import Forms from "@/components/Form/Forms";
import api from "../api/config";

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [performanceData, setPerformanceData] = useState({});
  const athleteId = JSON.parse(localStorage.getItem("user"))?.id;

  const fields = [
    {
      id: "total_matches",
      label: "Total Number of Matches Played",
      type: "number",
      placeholder: "Ex: 90",
    },
    {
      id: "wins",
      label: "No of Matches Won",
      type: "number",
      placeholder: "Ex: 66",
    },
    {
      id: "losses",
      label: "No of Matches Lost",
      type: "number",
      placeholder: "Ex: 24",
    },
    {
      id: "practice_sessions_per_week",
      label: "No of practice sessions",
      type: "number",
      placeholder: "Ex: 24",
    },
  ];

  const fetchPerformanceData = async () => {
    try {
      const res = await api.athletes.getPerformances(athleteId);
      setPerformanceData(res.data.performanceDetails);
      console.log("Performance data fetched successfully.",performanceData);
    } catch (error) {
      console.error("Failed to fetch performance data:", error);
    }
  };

  useEffect(() => {
    if (athleteId) fetchPerformanceData();
  }, [athleteId]);

  // Handle Form Submit - Create or Update Performance
  const formSubmit = async (formData) => {
    try {
      if (performanceData && performanceData.id) {
        await api.athletes.editPerformance(athleteId, formData);
        console.log("Performance data updated successfully.");
      } else {
        await api.athletes.createPerformance(athleteId, formData);
        console.log("Performance data created successfully.");
      }
      fetchPerformanceData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error handling performance data:", error);
    }
  };

  // ✅ Mapping performance data for Cards
  const performanceCards = [
    {
      icon: Matches,
      value: performanceData.total_matches || 0,
      subText: "Matches Played",
      percentage: "100%",
      up: true,
    },
    {
      icon: Wins,
      value: performanceData.wins || 0,
      subText: "Matches Won",
      percentage: performanceData.total_matches
        ? `${((performanceData.wins / performanceData.total_matches) * 100).toFixed(2)}%`
        : "0%",
      up: true,
    },
    {
      icon: Losses,
      value: performanceData.losses || 0,
      subText: "Matches Lost",
      percentage: performanceData.total_matches
        ? `${((performanceData.losses / performanceData.total_matches) * 100).toFixed(2)}%`
        : "0%",
      up: false,
    },
    {
      icon: Winrate,
      value: performanceData.total_matches
        ? `${((performanceData.wins / performanceData.total_matches) * 100).toFixed(2)}%`
        : "0%",
      subText: "Win Rate",
      percentage: performanceData.total_matches
        ? `${((performanceData.wins / performanceData.total_matches) * 100).toFixed(2)}%`
        : "0%",
      up: performanceData.wins >= performanceData.losses,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {performanceCards.map((item, index) => (
          <Cards
            key={index}
            icon={item.icon}
            value={item.value}
            subText={item.subText}
            percentage={item.percentage}
            up={item.up}
          />
        ))}
      </div>
      <div className="w-full flex gap-6 flex-col">
        <div className="flex gap-4 w-full">
          <PracticeSessionsChart practiceSession={performanceData.practice_sessions_per_week}/>
          <PerformanceChart />
        </div>
        <PerformanceSuggestions />
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Open Form
        </button>

        <Forms
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={formSubmit}
          fields={fields}
          title="Add Match Details"
          description="Please fill in the required details below."
        />
      </div>
    </>
  );
}
