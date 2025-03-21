import React from "react";
import { motion } from "framer-motion";
import Chess from "../../assets/images/Chess.jpg";
import Football from "../../assets/images/Football.jpg";
import Rugby from "../../assets/images/Rugby.jpg";

// Animation variants for reusability
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const articles = [
  {
    title: "Why Chess Players Trust Us for Peak Performance",
    description:
      "From strategy insights to mental endurance, top chess players rely on us to stay ahead of the game.",
    image: Chess,
    author: "Dylan Meringu",
    date: "Feb 21, 2025",
    readTime: "Checkmate in 5 moves",
    icon: "♟️",
  },
  {
    title: "Footballers Rely on Us for Next-Level Training",
    description:
      "Elite footballers trust our expert-backed fitness, diet, and recovery plans to perform at their best.",
    image: Football,
    author: "Dylan Meringu",
    date: "Feb 18, 2025",
    readTime: "90 minutes of game-changing insights",
    icon: "⚽",
  },
  {
    title: "Rugby Champions Count on Us for Strength & Strategy",
    description:
      "From powerful tackles to tactical plays, rugby professionals depend on our resources for success.",
    image: Rugby,
    author: "Dylan Meringu",
    date: "Feb 15, 2025",
    readTime: "Try this for a winning game plan",
    icon: "🏉",
  },
];

// Article Card Component with animation
const ArticleCard = ({ article, large = false }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <img
        src={article.image}
        alt={article.title}
        className={`w-full ${large ? "h-[640px]" : "h-[200px]"} object-cover`}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{article.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{article.description}</p>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <span className="mr-2">{article.icon}</span>
          <span className="font-semibold">{article.author}</span>
          <span className="mx-2">•</span>
          <span>{article.date}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Main Grid Component with staggered animations
const ArticleGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="md:col-span-2">
        <ArticleCard article={articles[0]} large={true} />
      </motion.div>
      <motion.div className="flex flex-col gap-6">
        <ArticleCard article={articles[1]} />
        <ArticleCard article={articles[2]} />
      </motion.div>
    </motion.div>
  );
};

export default ArticleGrid;
