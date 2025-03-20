import React from "react";

const sportsOptions = [
  "Football",
  "Basketball",
  "Cricket",
  "Tennis",
  "Badminton",
  "Hockey",
  "Swimming",
  "Athletics",
  "Volleyball",
  "Table Tennis",
  "Baseball",
];

const CoachFields = ({ formData, handleChange }) => {
  return (
    <div className="relative">
      <select
        name="sport"
        value={formData.sport}
        onChange={handleChange}
        className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
        required
      >
        <option value="">Select a Sport</option>
        {sportsOptions.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default CoachFields;
