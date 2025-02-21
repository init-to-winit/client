import React from "react";
import icon from "../../assets/images/kcal.png";
export default function DietCard() {
  return (
    <div className="flex bg-white">
      <img src={icon} alt="img" className="w-24" />
      <div>
        <h1 className="text-primary ">2500</h1>
      </div>
    </div>
  );
}
