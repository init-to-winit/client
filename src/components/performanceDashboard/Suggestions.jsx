import React, { useEffect, useState } from "react";
import api from "../../api/config";

const PerformanceSuggestions = () => {
  const [suggestions, setSuggestions] = useState({});
  const [loading, setLoading] = useState(true);
  const athleteId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await api.athletes.getPerformanceSuggestions(athleteId);

      // Parsing the stringified JSON in performanceSuggestion
      const parsedSuggestions = JSON.parse(response.data.performanceSuggestion);
      setSuggestions(parsedSuggestions);
      console.log("Parsed Suggestions:", parsedSuggestions);
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
    return (
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm text-center">
        <p className="text-xl font-semibold text-gray-700">Loading suggestions...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold text-gray-700 mb-6">
        Performance Suggestions
      </h1>

      {/* Dynamically Render Suggestions & Rationales */}
      <div className="border-t border-gray-200 py-4 space-y-8">
        {Object.entries(suggestions).map(([key, value], index) => {
          // Filter out rationale fields when rendering the main suggestions
          if (!key.includes("_rationale")) {
            const rationaleKey = `${key}_rationale`;
            const title = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()); // Format title nicely

            return (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-3"
              >
                <h2 className="text-xl font-semibold text-primary">{title}</h2>
                <p className="text-gray-700 text-base">
                  <span className="font-semibold">Suggestion: </span>
                  {value}
                </p>
                {suggestions[rationaleKey] && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Rationale: </span>
                    {suggestions[rationaleKey]}
                  </p>
                )}
              </div>
            );
          }
          return null; // Skip rationale fields from being listed separately
        })}
      </div>
    </div>
  );
};

export default PerformanceSuggestions;
