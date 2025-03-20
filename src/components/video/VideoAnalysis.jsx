import React from "react";

const VideoAnalyzer = ({ report }) => {
  if (!report) {
    return <div>No data available.</div>;
  }

  const {
    strengths,
    weaknesses,
    performance_suggestions,
    training_focus_areas,
  } = report;

  // Function to clean markdown formatting and format text properly
  const formatText = (text) => {
    return text
      .replace(/\*\*/g, "") // Remove markdown bold syntax
      .split("\n")
      .map((line, index) => {
        // Handle bullet points
        if (line.startsWith("-")) {
          return (
            <li key={index} className="text-gray-600 leading-relaxed">
              {line.replace("-", "").trim()}
            </li>
          );
        }
        return (
          <p key={index} className="text-gray-600 mb-2 leading-relaxed">
            {line}
          </p>
        );
      });
  };

  // Function to render each section
  const renderSection = (title, data) => (
    <div className="pt-6">
      <div
        className={`grid grid-cols-12 gap-4 pb-4 ${
          title === "Training Focus Areas" ? "" : "border-b-2"
        }  `}
      >
        {/* Title */}
        <div className="col-span-3">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>

        {/* Content */}
        <div className="col-span-9 space-y-4">
          {data.map((item, index) => {
            // Split the content into heading and body using ":"
            const [heading, ...body] = item.split(":");
            return (
              <div key={index} className="text-gray-600">
                {/* Heading */}
                {heading && (
                  <h4 className="font-medium text-gray-800 mb-1">
                    {heading.trim().replace("**", "")}
                  </h4>
                )}
                {/* Body */}
                {body.length > 0 && (
                  <div className="border-gray-300">
                    {formatText(body.join(":").trim())}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-6 bg-white">
      {/* Header */}
      <h2 className="text-xl font-semibold text-primary bg-secondary px-2 inline-block rounded-md mb-4">
        Performance Suggestions
      </h2>

      {/* Render Sections */}
      {strengths?.length > 0 && renderSection("Strengths", strengths)}
      {weaknesses?.length > 0 && renderSection("Weaknesses", weaknesses)}
      {performance_suggestions?.length > 0 &&
        renderSection("Suggestions", performance_suggestions)}
      {training_focus_areas?.length > 0 &&
        renderSection("Training Focus Areas", training_focus_areas)}
    </div>
  );
};

export default VideoAnalyzer;
