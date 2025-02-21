import { Utensils } from "lucide-react";
import React from "react";

export default function MealCard({ time, list }) {
  return (
    <div className="bg-white shadow-md p-6 inline-block rounded-lg">
      <div className="flex gap-2 items-center">
        <Utensils className="text-primary" />
        <h1 className="text-primary text-3xl bg-secondary px-3 rounded-md">
          {time}
        </h1>
      </div>
      <ul className="m-4 mb-0 list-disc list-inside text-2xl text-ptext">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
