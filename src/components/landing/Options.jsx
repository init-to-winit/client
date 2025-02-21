import React from "react";
import { HeartPulse, BarChart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const athleteInsights = [
  {
    text: "Transforming athlete journeys through precise metrics, peak performance, and optimal health.",
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
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {athleteInsights.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex-shrink-0 mx-4">{item.icon}</div>
            <p className="text-md leading-relaxed text-gray-700">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
