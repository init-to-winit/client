import React from "react";

export default function InjuryHistory({ injuries }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl rounded-md font-semibold bg-secondary px-4">
          Injury History
        </h2>
        {/* <a href="#" className="text-blue-500 hover:underline">
          See All
        </a> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2 px-4">Injury Name</th>
              <th className="py-2 px-4">Injury Happend on</th>
              <th className="py-2 px-4">Recovery Plan</th>
              <th className="py-2 px-4">Recovery Duration</th>
            </tr>
          </thead>
          <tbody>
            {injuries.map((injury, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">{injury.name}</td>
                <td className="py-3 px-4">{injury.happenedOn}</td>
                <td className="py-3 px-4">{injury.plan}</td>
                <td className="py-3 px-4">{injury.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
