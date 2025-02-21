import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faq from "../../constants/faqs.json";

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="faq"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 text-lg font-medium text-gray-800 focus:outline-none flex justify-between items-center transition-colors duration-300 hover:text-lime-600"
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-2xl"
        >
          {isOpen ? "-" : "+"}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex items-center "
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <p className="text-sm text-gray-600 mb-1">Creative Freedom</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            Frequently Asked
            <br />
            <motion.span
              className="inline-block bg-lime-200 rounded-lg px-4 py-2 mt-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Questions
            </motion.span>
          </h1>
        </div>

        <motion.div
          className="max-w-md ml-auto"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-700">
            Your success is our top priority. Our dedicated support team is here
            to assist you every step of the way.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="divide-y divide-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {faq.faqItems.map((item, index) => (
          <FaqAccordion
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FAQSection;
