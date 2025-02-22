import React from "react";
import { Droplets, Coffee, Utensils, Moon } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const MacroCard = ({ label, value, unit, className = "" }) => (
  <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold text-gray-900">
      {value}
      <span className="text-lg ml-1 text-gray-600">{unit}</span>
    </p>
  </div>
);

const MealCard = ({ title, items, icon: Icon }) => (
  <Card>
    <CardHeader className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-gray-600" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-4 space-y-2">
        {items?.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const SuggestionsSection = ({ dietaryPlan }) => {
  if (!dietaryPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-700">Loading dietary plan...</p>
      </div>
    );
  }

  const {
    calorie_suggestion,
    protein_suggestion,
    carbs_suggestion,
    fats_suggestion,
    breakfast_suggestion,
    lunch_suggestion,
    dinner_suggestion,
    food_rationale,
    hydration_suggestion,
    hydration_rationale,
  } = dietaryPlan;

  return (
    <div className="space-y-8">
      {/* Macro Nutrients Section */}
      {/* <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Daily Macro Targets
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MacroCard label="Calories" value={calorie_suggestion} unit="kcal" />
          <MacroCard label="Protein" value={protein_suggestion} unit="g" />
          <MacroCard label="Carbohydrates" value={carbs_suggestion} unit="g" />
          <MacroCard label="Fats" value={fats_suggestion} unit="g" />
        </div>
      </div> */}

      {/* Meal Plans Section */}
      <div>
        <h2 className="text-xl font-semibold text-primary bg-secondary px-2 inline-block rounded-md mb-4">
          Enhanced Daily Meal Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MealCard
            title="Breakfast"
            items={breakfast_suggestion}
            icon={Coffee}
          />
          <MealCard title="Lunch" items={lunch_suggestion} icon={Utensils} />
          <MealCard title="Dinner" items={dinner_suggestion} icon={Moon} />
        </div>
      </div>

      {/* Rationale & Hydration Section */}
      <div>
        <h2 className="text-xl font-semibold text-primary bg-secondary px-2 inline-block rounded-md  mb-4">
          Nutrition Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Plan Rationale
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{food_rationale}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center space-x-4">
              <Droplets className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Daily Hydration
                </h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {hydration_suggestion} Liters
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {hydration_rationale}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsSection;
