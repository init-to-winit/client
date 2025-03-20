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
      console.log(response.data.performanceSuggestion);

      // Directly use the response as it's already an object
      setSuggestions(response.data.performanceSuggestion);
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
    return <div>Loading suggestions...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-primary bg-secondary px-2 inline-block rounded-md mb-6">
        Performance Suggestions
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

export default PerformanceSuggestions;
