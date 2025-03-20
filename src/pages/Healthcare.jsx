import StatCard from "@/components/healthcare/StatCard";
import React from "react";
import Hydration from "../assets/images/Hydration.png";
import Moon from "../assets/images/Moon.png";
import BMI from "../assets/images/BMI.png";
import InjuryHistory from "@/components/healthcare/InjuryHistory";
import api from "../api/config";
import { useEffect, useState } from "react";
import Forms from "@/components/Form/Forms";
import HealthcareSuggestions from "@/components/healthcare/Suggestions";

// Loading State Component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#002E25] rounded-full animate-spin mb-4"></div>
    <p className="text-lg text-gray-600">Loading healthcare data...</p>
  </div>
);

export default function Healthcare() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [healthData, setHealthData] = useState(null); // Set initial value to null to indicate loading state
  const athleteId = JSON.parse(localStorage.getItem("user"))?.id;
  const healthStatData = [
    {
      icon: Hydration,
      value: `${healthData?.hydration_level || 0} L`,
      subText: "Hydration Level",
    },
    {
      icon: Moon,
      value: `${healthData?.sleep_hours || 0} hrs`,
      subText: "Sleep Hours",
    },
    {
      icon: BMI,
      value: `${healthData?.bmi || 0}`,
      subText: "BMI",
    },
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

  const fields = [
    {
      id: "hydration_level",
      label: "Mention your hydration level(in litres)",
      type: "number",
      placeholder: "Ex: 90",
    },
    {
      id: "sleep_hours",
      label: "Mention your sleeping hours",
      type: "number",
      placeholder: "Ex: 66",
    },
    {
      id: "height",
      label: "Mention your height(in cms)",
      type: "number",
      placeholder: "Ex: 24",
    },
    {
      id: "weight",
      label: "Mention your weight(in kgs)",
      type: "number",
      placeholder: "Ex: 24",
    },
    {
      id: "injury",
      label: "Mention your injury_name",
      type: "text",
      placeholder: "Ex: Knee Sprain",
    },
    {
      id: "recoveryPlan",
      label: "Mention your Plan for recovery",
      type: "text",
      placeholder: "Ex: 24",
    },
    {
      id: "recoveryDuration",
      label: "Mention your recovery duration(days)",
      type: "text",
      placeholder: "Ex: 24",
    },
    {
      id: "date",
      label: "Mention your date of injury",
      type: "month",
      placeholder: "Ex: 24",
    },
  ];

  const fetchHealthData = async () => {
    try {
      const res = await api.athletes.getHealthcareDetails(athleteId);
      setHealthData(res.data.healthcareDetails);
      console.log("Health data fetched successfully.");
    } catch (error) {
      console.error("Failed to fetch performance data:", error);
    }
  };

  useEffect(() => {
    if (athleteId) fetchHealthData();
  }, [athleteId]);

  // Handle Form Submit - Create or Update Performance
  const formSubmit = async (formData) => {
    try {
      const formattedData = {
        hydration_level: parseFloat(formData.hydration_level),
        sleep_hours: parseFloat(formData.sleep_hours),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        injury_history: [
          {
            injury: formData.injury,
            recoveryPlan: formData.recoveryPlan,
            recoveryDuration: formData.recoveryDuration,
            date: formData.date,
          },
        ],
      };

      if (healthData && healthData.id) {
        await api.athletes.editHealthcare(athleteId, formattedData);
        console.log("Performance data updated successfully.");
      } else {
        await api.athletes.addHealthcare(athleteId, formattedData);
        console.log("Performance data created successfully.");
      }
      fetchHealthData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error handling performance data:", error);
    }
  };

  // if (!healthData) {
  //   // Show loading state while healthData is not available
  //   return <LoadingState />;
  // }

  return (
    <div className="">
      <div className="flex mb-6  justify-end">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Data +
        </button>
      </div>
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
      <InjuryHistory
        injuries={
          healthData?.injury_history?.map((injury) => ({
            name: injury.injury,
            happenedOn: injury.date,
            plan: injury.recoveryPlan,
            duration: injury.recoveryDuration,
          })) || []
        }
      />
      <HealthcareSuggestions />
      <Forms
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={formSubmit}
        fields={fields}
        title="Add Match Details"
        description="Please fill in the required details below."
      />
    </div>
  );
}
