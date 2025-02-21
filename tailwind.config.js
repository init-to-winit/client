/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002E25", // Dark Green
        secondary: "#CDFA89", // Light Green
        darkbg: "#F3F7F6",
        ptext: "#A3A3A3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
