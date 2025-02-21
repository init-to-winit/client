import React from "react";
import { useLocation } from "react-router-dom";

export default function Hello() {
  const location = useLocation(); // Get current route

  // Define dynamic content for each route
  const pageData = {
    "/dashboard": {
      title: "Dashboard",
      message: "Hi, Harikesh. Welcome back to your Dashboard!",
    },
    "/dietary": {
      title: "Athlete Dietary",
      message: "Hi, Harikesh. Welcome back to Your Healthcare Plan!",
    },
    "/healthcare": {
      title: "Healthcare Overview",
      message: "Manage your health records and reports efficiently.",
    },
    "/performance": {
      title: "Performance Metrics",
      message: "Track and analyze your athletic performance!",
    },
    "/sponsors": {
      title: "Sponsorship Opportunities",
      message: "Find and manage your sponsorship deals here.",
    },
    "/coaches": {
      title: "Coaching & Training",
      message: "Connect with top coaches and enhance your skills.",
    },
  };

  // Get current page data or fallback to a default
  const { title, message } = pageData[location.pathname] || {
    title: "Welcome",
    message: "Hi, Harikesh! Explore your sports journey.",
  };

  return (
    <div className="bg-darkbg px-10 py-4">
      <h1 className="text-primary text-2xl font-semibold mb-1">{title}</h1>
      <p className="text-[#A3A3A3]">{message}</p>
    </div>
  );
}
