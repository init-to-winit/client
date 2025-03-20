import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Email validation regex pattern
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleLogin = (email) =>{
    navigate("/signup", { state: { email } });
  }

  return (
    <div
      className="bg-[#F3F7F6] flex flex-col items-center justify-center  min-h-[calc(100vh-80px)]"
      id="home"
    >
      <motion.p
        className="font-['Poppins'] uppercase tracking-widest mt-[20vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Rise Perform Conquer
      </motion.p>

      <motion.h1
        className="text-7xl font-medium my-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        Bringing{" "}
        <span className="px-2 py-1 bg-secondary rounded-lg">
          Vitality to sports
        </span>
      </motion.h1>

      <motion.h2
        className="text-5xl tracking-tighter font-medium mt-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        driven by metrics and powered by health.
      </motion.h2>

      <motion.p
        className="font-['Poppins'] text-xl my-[3rem] text-center font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
      >
        <span className="font-bold">Vismoh</span> empowers athletes by unlocking
        opportunities, creating a space <br />
        where performance meets possibility and potential turns into success.
      </motion.p>

      <motion.div
        className="flex items-center bg-white p-2 rounded-full w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-grow px-4 py-3 bg-white focus:outline-none text-gray-700"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`font-semibold px-5 py-3 rounded-full transition-all duration-300 ${
            isValidEmail(email)
              ? "bg-lime-300 text-gray-600 hover:bg-lime-400"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isValidEmail(email)}
          onClick={()=>handleLogin(email)}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
