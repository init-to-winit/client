import DietCard from "@/components/dietary/DietCard";
import React, { useEffect, useState } from "react";
import kcal from "../assets/images/kcal.png";
import Egg from "../assets/images/Egg.png";
import Carbs from "../assets/images/Carbs.png";
import Fats from "../assets/images/Fats.png";
import MealCard from "@/components/dietary/MealCard";
import Forms from "@/components/Form/Forms";
import api from "../api/config";

export default function Dietary() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dietaryData, setDietaryData] = useState({});
  const athleteId = JSON.parse(localStorage.getItem("user"))?.id;
  const enhancedDietData = [
    { icon: kcal, value: "2800", subText: "Calories" },
    { icon: Egg, value: "140g", subText: "Proteins" },
    { icon: Carbs, value: "380g", subText: "Carbs" },
    { icon: Fats, value: "50g", subText: "Fats" },
  ];
  const fields = [
    {
      id: "calories_per_day",
      label: "Mention your calories per day",
      type: "number",
      placeholder: "Ex: 90",
    },
    {
      id: "protein_intake",
      label: "Mention your protein intake",
      type: "number",
      placeholder: "Ex: 66",
    },
    {
      id: "carbs_intake",
      label: "Mention your carbs intake",
      type: "number",
      placeholder: "Ex: 24",
    },
    {
      id: "fats_intake",
      label: "Mention your fats intake",
      type: "number",
      placeholder: "Ex: 24",
    },
    {
      id: "breakfast_items",
      label: "Breakfast Items (separate by commas)",
      type: "text",
      placeholder: "Ex: Oatmeal, Banana, Almonds",
    },
    {
      id: "lunch_items",
      label: "Lunch Items (separate by commas)",
      type: "text",
      placeholder: "Ex: Grilled Chicken, Brown Rice, Vegetables",
    },
    {
      id: "dinner_items",
      label: "Dinner Items (separate by commas)",
      type: "text",
      placeholder: "Ex: Eggs, Milk, Bread",
    },
  ];

  const fetchDietaryData = async () => {
    try {
      const res = await api.athletes.getDietary(athleteId);
      setDietaryData(res.data.dietaryPlan);
      console.log("Performance data fetched successfully.", dietaryData);
    } catch (error) {
      console.error("Failed to fetch performance data:", error);
    }
  };

  useEffect(() => {
    if (athleteId) fetchDietaryData();
  }, [athleteId]);

  // Handle Form Submit - Create or Update Performance
  const formSubmit = async (formData) => {
    try {
      const meals = {
        meal_plan: [
          {
            meal: "Breakfast",
            items: formData.breakfast_items
              .split(",")
              .map((item) => item.trim()),
          },
          {
            meal: "Lunch",
            items: formData.lunch_items.split(",").map((item) => item.trim()),
          },
          {
            meal: "Dinner",
            items: formData.dinner_items.split(",").map((item) => item.trim()),
          },
        ],
      };

      const formattedData = {
        dietaryPlan: {
          calories_per_day: parseFloat(formData.calories_per_day),
          protein_intake: `${formData.protein_intake}g`,
          carbs_intake: `${formData.carbs_intake}g`,
          fats_intake: `${formData.fats_intake}g`,
          meal_plan: meals.meal_plan,
        },
      };

      if (dietaryData && dietaryData.id) {
        await api.athletes.editDietary(athleteId, formattedData);
        console.log("Performance data updated successfully.");
      } else {
        await api.athletes.addDietary(athleteId, formattedData);
        console.log("Performance data created successfully.");
      }
      fetchDietaryData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error handling performance data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mr-8">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Data +
        </button>
      </div>
      <div>
        <p className="text-ptext">Current Diet Plan</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {dietaryData?.calories_per_day && (
            <>
              <DietCard
                icon={kcal}
                value={dietaryData.calories_per_day}
                subText="Calories"
              />
              <DietCard
                icon={Egg}
                value={dietaryData.protein_intake}
                subText="Proteins"
              />
              <DietCard
                icon={Carbs}
                value={dietaryData.carbs_intake}
                subText="Carbs"
              />
              <DietCard
                icon={Fats}
                value={dietaryData.fats_intake}
                subText="Fats"
              />
            </>
          )}
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
          {dietaryData?.meal_plan?.length > 0 &&
            dietaryData.meal_plan.map((meal, index) => (
              <MealCard key={index} time={meal.meal} list={meal.items} />
            ))}
        </div>
      </div>

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
