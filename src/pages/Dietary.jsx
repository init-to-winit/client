import DietCard from "@/components/dietary/DietCard";
import React from "react";
import kcal from "../assets/images/kcal.png";
import Egg from "../assets/images/Egg.png";
import Carbs from "../assets/images/Carbs.png";
import Fats from "../assets/images/Fats.png";
import MealCard from "@/components/dietary/MealCard";

export default function Dietary() {
  const currentDietData = [
    { icon: kcal, value: "2500", subText: "Calories" },
    { icon: Egg, value: "150g", subText: "Proteins" },
    { icon: Carbs, value: "300g", subText: "Carbs" },
    { icon: Fats, value: "70g", subText: "Fats" },
  ];
  const enhancedDietData = [
    { icon: kcal, value: "2800", subText: "Calories" },
    { icon: Egg, value: "140g", subText: "Proteins" },
    { icon: Carbs, value: "380g", subText: "Carbs" },
    { icon: Fats, value: "50g", subText: "Fats" },
  ];
  return (
    <div>
      <div>
        <p className="text-ptext">Current Diet Plan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {currentDietData.map((item, index) => (
            <DietCard
              key={index}
              icon={item.icon}
              value={item.value}
              subText={item.subText}
            />
          ))}
        </div>
      </div>
      <div className="my-8">
        <p className="text-ptext">Enhanced Diet Plan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {enhancedDietData.map((item, index) => (
            <DietCard
              key={index}
              icon={item.icon}
              value={item.value}
              subText={item.subText}
            />
          ))}
        </div>
      </div>
      <div className="my-8">
        <p className="text-ptext">Meal Plan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <MealCard />
        </div>
      </div>
    </div>
  );
}
