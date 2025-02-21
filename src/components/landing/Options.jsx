import React from "react";
import { HeartPulse, BarChart, ShieldCheck } from "lucide-react";

const athleteInsights = [
  {
    text: "Transforming athlete journeys through  precise metrics, peak performance, and optimal health.",
    icon: <HeartPulse size={28} className="text-primary" />,
  },
  {
    text: "Where sports excellence is driven by vitality, guided by metrics, and sustained by health.",
    icon: <BarChart size={28} className="text-primary" />,
  },
  {
    text: "Empowering athletes with the balance of vitality, performance insights, and health management.",
    icon: <ShieldCheck size={28} className="text-primary" />,
  },
];

export default function Options() {
  return (
    <div className="bg-[#F3F7F6] py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {athleteInsights.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-6 ">
            <div className="flex-shrink-0 mx-4">{item.icon}</div>
            <p className="text-md leading-relaxed text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
