import React from "react";

export default function Hero() {
  return (
    <div className="bg-[#F3F7F6] flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <p className="font-['Poppins'] uppercase tracking-widest">
        Rise Perform Conquer
      </p>
      <h1 className="text-7xl font-medium my-6 text-center">
        Bringing <span className="px-3 bg-secondary">Vitality to sports</span>
      </h1>
      <h2 className="text-5xl tracking-tighter font-medium mt-2 text-center">
        driven by metrics and powered by health.
      </h2>
      <p className="font-['Poppins'] text-xl my-[3rem] text-center">
        <span className="font-bold">Vismoh</span> empowers athletes by unlocking
        opportunities, creating a space <br />
        where performance meets possibility and potential turns into success.
      </p>
      <div className="flex items-center bg-white p-2 rounded-full w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-grow px-4 py-3 bg-white focus:outline-none text-gray-700"
        />
        <button className="bg-lime-300 text-gray-600 font-semibold px-5 py-3 rounded-full hover:bg-lime-400">
          Get Started
        </button>
      </div>
    </div>
  );
}
