import React from "react";
export default function DietCard({ value, icon, subText }) {
  return (
    <div className="inline-flex bg-white px-12 py-8 gap-8 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] w-fit">
      <img src={icon} alt="img" className="w-24" />
      <div>
        <h1 className="text-primary text-4xl font-bold ">{value}</h1>
        <p className="my-1">{subText}</p>
        <p className="text-sm text-ptext">Per Day</p>
      </div>
    </div>
  );
}
