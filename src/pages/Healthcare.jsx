import StatCard from "@/components/healthcare/StatCard";
import React from "react";
import Hydration from "../assets/images/Hydration.png";
import Moon from "../assets/images/Moon.png";
import BMI from "../assets/images/BMI.png";
import InjuryHistory from "@/components/healthcare/InjuryHistory";

export default function Healthcare() {
  const healthStatData = [
    { icon: Hydration, value: "8000 ml", subText: "Hydration Level" },
    { icon: Moon, value: "8 hrs", subText: "Sleep Hours" },
    { icon: BMI, value: "300g", subText: "BMI", perDay: false },
  ];

  const injuries = [
    {
      name: "Muscle Pain",
      plan: "Physiotherapy",
      duration: "2 Months",
      happenedOn: "02/2024",
    },
    {
      name: "Muscle Pain",
      plan: "Physiotherapy",
      duration: "2 Months",
      happenedOn: "02/2024",
    },
    {
      name: "Muscle Pain",
      plan: "Physiotherapy",
      duration: "2 Months",
      happenedOn: "02/2024",
    },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthStatData.map((item, index) => (
          <StatCard
            key={index}
            icon={item.icon}
            value={item.value}
            subText={item.subText}
            perDay={item.perDay}
          />
        ))}
      </div>
      <InjuryHistory injuries={injuries} />
    </div>
  );
}
