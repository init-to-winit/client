import React from "react";
import { motion } from "framer-motion";

export default function Track() {
  return (
    <div className="bg-[#F3F7F6] w-full flex justify-center">
      <motion.div
        className="bg-[#F3F7F6] flex gap-10 px-auto py-[5rem] max-w-7xl items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.h1
          className="text-5xl font-semibold text-primary leading-normal"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Track, manage, and customize athlete growth with ease
        </motion.h1>

        <motion.p
          className="font-light"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Discover a smart solution that accelerates athlete management and
          performance tracking.
        </motion.p>
      </motion.div>
    </div>
  );
}
