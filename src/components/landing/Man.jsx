import React from "react";
import { motion } from "framer-motion";
import ManRunning from "../../assets/images/man-running.png";
import { CircleCheckBig } from "lucide-react";

export default function Man() {
  return (
    <div className="flex max-7xl mx-auto items-center justify-center gap-16 mb-[5rem]">
      {/* Left Side - Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="my-[2rem]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-5xl my-3 font-medium bg-secondary px-4 rounded-md py-2 text-primary inline-block">
            Empowering Athletes
          </span><br />
          <span className="text-5xl font-medium px-4 rounded-sm text-primary">
            through every connection.
          </span>
        </motion.div>

        <motion.p
          className="max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Seamless athlete management and reliable performance insights. You can
          trust <strong>Vismoh</strong> to deliver every time.
        </motion.p>

        <motion.p
          className="my-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Look no further for the solution to your needs.
        </motion.p>

        <motion.div
          className="flex gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CircleCheckBig size={20} />
            <p className="font-semibold">Beautiful Sections</p>
          </motion.div>
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <CircleCheckBig size={20} />
            <p className="font-semibold">Suited to every player</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src={ManRunning} alt="Man Running" />
      </motion.div>
    </div>
  );
}
