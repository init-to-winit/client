import Cards from "@/components/performanceDashboard/Cards";
import PerformanceChart from "@/components/performanceDashboard/PerformanceChart";
import PracticeSessionsChart from "@/components/performanceDashboard/PerformanceLineChart";
import PerformanceSuggestions from "@/components/performanceDashboard/Suggestions";
import React from "react";
import Matches from "../assets/images/Matches.png";
import Wins from "../assets/images/Wins.png";
import Losses from "../assets/images/Losses.png";
import Winrate from "../assets/images/Winrate.png";
export default function Dashboard() {
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
      </div>
    </>
  );
}
