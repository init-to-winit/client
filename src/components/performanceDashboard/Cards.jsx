import React from "react";
import Up from "../../assets/images/Up.png";
import Down from "../../assets/images/Down.png";

export default function Cards({ value, icon, subText, percentage, up = true }) {
  return (
    <div className="inline-flex items-center bg-white px-8 py-4 gap-8 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] w-fit">
      <img src={icon} alt="img" className="w-20" />
      <div>
        <h1 className="text-primary text-3xl font-bold ">{value}</h1>
        <p className="my-1">{subText}</p>
        <div className="flex gap-2 ">
          {Up ? <img src={Up} alt="UP" /> : <img src={Down} alt="Down" />}

          <p className="text-sm text-ptext">{percentage} (30 days) </p>
        </div>
      </div>
    </div>
  );
}
