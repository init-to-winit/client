import React from 'react';

const sportsOptions = ['Monetary', 'Equipment', 'Training'];
const SponsorFields = ({ formData, handleChange }) => {
  // Currently no sponsor-specific fields, but this component
  // can be extended in the future with sponsor-specific fields
  return (
    <>
      <div className="relative">
        <select
          name="sponsorshipType"
          value={formData.sponsorshipType}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
          required
        >
          <option value="">Select an option</option>
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

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </>
  );
};

export default SponsorFields;
