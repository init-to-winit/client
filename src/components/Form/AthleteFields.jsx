import React from "react";

const sportsData = {
  Archery: ["Recurve", "Compound"],
  "Artistic Swimming": ["Solo", "Duet", "Team"],
  Athletics: ["Sprinter", "Long-Distance Runner", "High Jumper", "Thrower"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Basketball: [
    "Point Guard",
    "Shooting Guard",
    "Small Forward",
    "Power Forward",
    "Center",
  ],
  "Basketball 3x3": ["Guard", "Forward", "Center"],
  Boxing: ["Lightweight", "Middleweight", "Heavyweight"],
  Breaking: ["B-Boy", "B-Girl"],
  "Canoe Slalom": ["Kayak", "Canoe"],
  "Canoe Sprint": ["Kayak", "Canoe"],
  "Cycling BMX Freestyle": ["Park", "Street"],
  "Cycling BMX Racing": ["Elite Men", "Elite Women"],
  "Cycling Mountain Bike": ["Cross-Country", "Downhill"],
  "Cycling Road": ["Sprinter", "Time Trialist", "Climber"],
  "Cycling Track": ["Sprint", "Keirin", "Madison"],
  Cricket: ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper"],
  Diving: ["Springboard", "Platform"],
  "Equestrian Dressage": ["Rider", "Horse"],
  "Equestrian Eventing": ["Dressage", "Cross-Country", "Jumping"],
  "Equestrian Jumping": ["Rider", "Horse"],
  Fencing: ["Épée", "Foil", "Sabre"],
  "Football (Soccer)": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Golf: ["Professional", "Amateur"],
  "Gymnastics Artistic": [
    "Vault",
    "Uneven Bars",
    "Balance Beam",
    "Floor Exercise",
  ],
  "Gymnastics Rhythmic": ["Individual", "Group"],
  Handball: ["Goalkeeper", "Wing", "Back", "Pivot", "Center"],
  Hockey: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Judo: ["Lightweight", "Middleweight", "Heavyweight"],
  "Modern Pentathlon": ["Fencing", "Swimming", "Riding", "Shooting", "Running"],
  Rowing: ["Single Sculls", "Double Sculls", "Coxed Four", "Eight"],
  "Rugby Sevens": ["Forward", "Back"],
  Sailing: ["Dinghy", "Keelboat", "Windsurfing"],
  Shooting: ["Pistol", "Rifle", "Shotgun"],
  Skateboarding: ["Street", "Park"],
  "Sport Climbing": ["Speed", "Bouldering", "Lead"],
  Surfing: ["Shortboard", "Longboard"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"],
  "Table Tennis": ["Singles", "Doubles", "Mixed Doubles"],
  Taekwondo: ["Flyweight", "Featherweight", "Heavyweight"],
  Tennis: ["Singles", "Doubles"],
  "Trampoline Gymnastics": ["Individual"],
  Triathlon: ["Swim", "Bike", "Run"],
  Volleyball: ["Outside Hitter", "Middle Blocker", "Setter", "Libero"],
  "Water Polo": ["Goalkeeper", "Center Forward", "Defender"],
  Weightlifting: ["Snatch", "Clean and Jerk"],
  "Wrestling Freestyle": ["Lightweight", "Middleweight", "Heavyweight"],
  "Wrestling Greco-Roman": ["Lightweight", "Middleweight", "Heavyweight"],
  "Alpine Skiing": ["Slalom", "Giant Slalom", "Super-G", "Downhill"],
  Biathlon: ["Sprint", "Pursuit", "Mass Start"],
  Bobsleigh: ["Two-Man", "Four-Man", "Monobob"],
  "Cross-Country Skiing": ["Sprint", "Distance"],
  Curling: ["Lead", "Second", "Third", "Skip"],
  "Figure Skating": ["Singles", "Pairs", "Ice Dance"],
  "Freestyle Skiing": ["Moguls", "Aerials", "Halfpipe", "Slopestyle"],
  "Ice Hockey": ["Goalkeeper", "Defender", "Forward"],
  Luge: ["Singles", "Doubles", "Team Relay"],
  "Nordic Combined": ["Ski Jumping", "Cross-Country Skiing"],
  "Short Track Speed Skating": ["500m", "1000m", "1500m"],
  Skeleton: ["Men", "Women"],
  "Ski Jumping": ["Normal Hill", "Large Hill"],
  Snowboard: ["Halfpipe", "Slopestyle", "Big Air"],
  "Speed Skating": ["500m", "1000m", "1500m", "Mass Start"],
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
