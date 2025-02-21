import React from "react";
import { motion } from "framer-motion";

// Animation variants for hero text and button
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation variants for features with staggered effect
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StrategicChoice() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Hero section */}
          <motion.div
            className="w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
              variants={heroVariants}
            >
              We are a <br />
              <span className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4 inline-block bg-lime-200 px-3 py-1 rounded">
                Strategic choice
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-8"
              variants={heroVariants}
            >
              World-class athlete management, built for peak performance—Vismoh
              delivers excellence every time.
            </motion.p>

            <motion.button
              className="bg-black text-white flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={heroVariants}
            >
              <span className="flex items-center justify-center w-6 h-6">
                ▶
              </span>
              <span>Watch Video Guide</span>
            </motion.button>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {[
              {
                title: "Personalized Analytics & Health Care",
                desc: "Players receive customized performance analytics along with healthcare and dietary recommendations.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                ),
              },
              {
                title: "Career Growth Insights",
                desc: "Players get tailored sponsor and coach suggestions based on their performance and specific needs.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
              },
              {
                title: "Athlete Discovery & Analytics",
                desc: "Coaches and sponsors can find top-performing athletes across all sports and access their performance analytics.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                ),
              },
              {
                title: "Player Development & Suggestions",
                desc: "Trust our team of experts to deliver what you need now.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                variants={featureVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-lime-50 text-lime-500 rounded-full mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
