import React from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/images/Logo-white.png";

export default function Footer() {
  return (
    <motion.footer
      className="bg-primary text-secondary"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="lg:flex lg:items-start lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={Logo} alt="Vismoh" />
          </motion.div>

          <motion.div
            className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 md:grid-cols-3 lg:grid-cols-5 lg:gap-y-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.3 }}
          >
            <motion.div
              className="col-span-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold">Vismoh</h2>
              <p className="mt-4 text-gray-400">
                Bringing vitality to sports, driven by metrics and powered by
                health.
              </p>
            </motion.div>

            <motion.div
              className="col-span-2 lg:col-span-3 lg:flex lg:items-end"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>

                <motion.div
                  className="border border-gray-700 p-2 focus-within:ring-2 sm:flex sm:items-center sm:gap-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Enter your email"
                    className="w-full border-none bg-transparent text-white placeholder-gray-400 sm:text-sm"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-1 w-full bg-secondary px-6 py-3 text-sm font-bold tracking-wide text-primary uppercase transition hover:bg-primary hover:text-secondary sm:mt-0 sm:w-auto sm:shrink-0"
                  >
                    Sign Up
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {["Services", "Company", "Helpful Links", "Legal", "Downloads"].map(
              (title, index) => (
                <motion.div
                  key={index}
                  className="col-span-2 sm:col-span-1"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="font-medium">{title}</p>
                  <ul className="mt-6 space-y-4 text-sm">
                    {["Link 1", "Link 2", "Link 3"].map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-gray-300 transition hover:text-gray-100"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}

            <motion.ul
              className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {["Facebook", "Instagram", "Twitter", "GitHub"].map(
                (platform, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-300 transition hover:text-white"
                    >
                      <span className="sr-only">{platform}</span>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </a>
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
