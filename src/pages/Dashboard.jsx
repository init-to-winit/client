import Cards from "@/components/performanceDashboard/Cards";
import PerformanceChart from "@/components/performanceDashboard/PerformanceChart";
import PracticeSessionsChart from "@/components/performanceDashboard/PerformanceLineChart";
import PerformanceSuggestions from "@/components/performanceDashboard/Suggestions";
import React from "react";
import Matches from "../assets/images/Matches.png";
import Wins from "../assets/images/Wins.png";
import Losses from "../assets/images/Losses.png";
import Winrate from "../assets/images/Winrate.png";
import Forms from "@/components/Form/Forms";
import { useState } from "react";
export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const currentDietData = [
    {
      icon: Matches,
      value: "2500",
      subText: "Calories",
      percentage: "2%",
      up: false,
    },
    { icon: Wins, value: "150g", subText: "Proteins", percentage: "6%" },
    { icon: Losses, value: "300g", subText: "Carbs", percentage: "3%" },
    {
      icon: Winrate,
      value: "70g",
      subText: "Fats",
      percentage: "4%",
      up: false,
    },
  ];
  const fields = [
    {
      id: "total_matches",
      label: "Total Number of Matches Played",
      type: "number",
      placeholder: "Ex: 90",
    },
    {
      id: "matches_won",
      label: "No of Matches Won",
      type: "number",
      placeholder: "Ex: 66",
    },
    {
      id: "matches_lost",
      label: "No of Matches Lost",
      type: "number",
      placeholder: "Ex: 24",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {currentDietData.map((item, index) => (
          <Cards
            key={index}
            icon={item.icon}
            value={item.value}
            subText={item.subText}
            percentage={item.percentage}
            up={item?.up}
          />
        ))}
      </div>
      <div className="w-full flex gap-6 flex-col">
        <div className="flex gap-4 w-full">
          <PracticeSessionsChart />
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
          onSubmit={(data) => console.log(data)}
          fields={fields}
          title="Add Match Details"
          description="Please fill in the required details below."
        />
      </div>
    </>
  );
}
