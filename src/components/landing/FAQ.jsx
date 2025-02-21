import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faq from "../../constants/faqs.json";

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 overflow-hidden">
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
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center ">
        <div>
        <p className="text-sm text-gray-600 mb-1">Creative Freedom</p>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Frequently Asked
          <br />
          <span className="inline-block bg-lime-200 rounded-lg px-4 py-2 mt-2">Questions</span>
        </h1>
        </div>

        <div className="max-w-md ml-auto">
          <p className="text-gray-700">
            Your success is our top priority. Our dedicated support team is here
            to assist you every step of the way.
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {faq.faqItems.map((item, index) => (
          <FaqAccordion key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
