import React, { useEffect, useState } from "react";
import api from "../../api/config";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#002E25] rounded-full animate-spin"></div>
    <p className="ml-4 text-lg text-gray-600">Loading suggestions...</p>
  </div>
);

const HealthcareSuggestions = () => {
  const [suggestions, setSuggestions] = useState({});
  const [loading, setLoading] = useState(true);
  const athleteId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await api.athletes.getHealthcareSuggestions(athleteId);
      console.log(response.data.healthcareSuggestion);

      // Directly use the response as it's already an object
      setSuggestions(response.data.healthcareSuggestion);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Healthcare Suggestions
      </h1>

      {/* Dynamically Render Suggestions & Rationales */}
      {Object.entries(suggestions).map(([key, value], index) => {
        // Filter out rationale fields when rendering the main suggestions
        if (!key.includes("_rationale")) {
          const rationaleKey = `${key}_rationale`;
          const title = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Format title nicely

          return (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-700">Suggestion: {value}</p>

              {suggestions[rationaleKey] && (
                <p className="text-gray-600 mt-2">
                  <strong>Rationale: </strong>
                  {suggestions[rationaleKey]}
                </p>
              )}
            </div>
          );
        }
        return null; // Skip rationale fields from being listed separately
      })}
    </div>
  );
};

export default HealthcareSuggestions;
