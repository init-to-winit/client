import DietCard from "@/components/dietary/DietCard";
import React from "react";

export default function Dietary() {
  return (
    <div>
      <p className="text-ptext">Current Diet Plan</p>
      <div>
        <DietCard />
      </div>
    </div>
  );
}
