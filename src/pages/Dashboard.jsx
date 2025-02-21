import PerformanceChart from "@/components/performanceDashboard/PerformanceChart";
import PracticeSessionsChart from "@/components/performanceDashboard/PerformanceLineChart";
import PerformanceSuggestions from "@/components/performanceDashboard/Suggestions";
import React from "react";

export default function Dashboard() {
  return (
  <div className="w-full flex gap-6 flex-col">
    <div className="flex gap-4 w-full"><PracticeSessionsChart />
    <PerformanceChart /></div>
    <PerformanceSuggestions />
  </div>
  );
}
