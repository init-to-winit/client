import React from "react";
import { motion } from "framer-motion";
import ArticleGrid from "./ArticleGrid";

// Animation variants for reusability
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function WhyUs() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="text-center">
        <motion.p variants={textVariants} className="text-lg text-gray-500">
          Our Trust
        </motion.p>
        <motion.h1
          variants={textVariants}
          className="text-5xl font-medium px-4 rounded-sm text-primary my-4"
        >
          Why Trust Us?
        </motion.h1>
        <motion.h1
          variants={textVariants}
          className="text-5xl font-medium px-4 rounded-sm text-primary my-4"
        >
          See what{" "}
          <span className="bg-secondary px-2"> our experts</span> are saying.
        </motion.h1>
        <ArticleGrid />
      </div>
    </motion.div>
  );
}
