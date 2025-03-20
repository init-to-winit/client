import React from "react";

const sportsData = {
  Football: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Basketball: [
    "Point Guard",
    "Shooting Guard",
    "Small Forward",
    "Power Forward",
    "Center",
  ],
  Cricket: ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"],
  Athletics: ["Sprinter", "Long-Distance Runner", "High Jumper", "Thrower"],
  Hockey: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
};

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

const AthleteFields = ({ formData, handleChange }) => {
  return (
    <>
      {/* Sports Dropdown */}
      <div className="relative">
        <select
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
          required
        >
          <option value="" disabled>
            Select Sport
          </option>
          {Object.keys(sportsData).map((sport, index) => (
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
            ></path>
          </svg>
        </div>
      </div>

      {/* Position Dropdown - Updates Based on Selected Sport */}
      <div className="relative mt-4">
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
          required
          disabled={!formData.sport} // Disable if no sport is selected
        >
          <option value="" disabled>
            Select Position
          </option>
          {formData.sport &&
            sportsData[formData.sport]?.map((position, index) => (
              <option key={index} value={position}>
                {position}
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
            ></path>
          </svg>
        </div>
      </div>

      {/* Experience Level Dropdown */}
      <div className="relative mt-4">
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
          required
        >
          <option value="" disabled>
            Select Experience Level
          </option>
          {experienceLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
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
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default AthleteFields;
