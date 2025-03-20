import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

export default function Sidebar() {
  const location = useLocation(); // Get current route

  // Fetch user data
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role || "";
  const id = user?.id || "";

  // Define menu items for different roles
  const baseMenuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "ri-dashboard-line",
      path: "/dashboard",
    },
    {
      id: 20,
      label: "Chats",
      icon: "ri-chat-1-line",
      path: "/communication",
    },
  ];

  const athleteMenuItems = [
    { id: 2, label: "Dietary", icon: "ri-leaf-line", path: "/dietary" },
    {
      id: 3,
      label: "Healthcare",
      icon: "ri-heart-pulse-line",
      path: "/healthcare",
    },
    { id: 4, label: "Sponsors", icon: "ri-file-list-line", path: "/sponsors" },
    { id: 5, label: "Coaches", icon: "ri-user-star-line", path: "/coaches" },
    { id: 12, label: "Requests", icon: "ri-link", path: "/requests" },
    { id: 18, label: "Chatbot", icon: "ri-chat-1-line", path: "/help" },
    {
      id: 19,
      label: "Video Analyser",
      icon: "ri-user-line",
      path: `/video-analysis`,
    },
  ];

  const coachMenuItems = [
    { id: 6, label: "Players", icon: "ri-team-line", path: "/players" },
    { id: 7, label: "Sponsors", icon: "ri-file-list-line", path: "/sponsors" },
    {
      id: 11,
      label: "Leaderboard",
      icon: "ri-bar-chart-box-line",
      path: "/leaderboard",
    },
    { id: 13, label: "Requests", icon: "ri-link", path: "/requests" },
    { id: 18, label: "Chatbot", icon: "ri-chat-1-line", path: "/help" },
  ];

  const sponsorMenuItems = [
    { id: 8, label: "Players", icon: "ri-team-line", path: "/players" },
    { id: 9, label: "Coaches", icon: "ri-user-star-line", path: "/coaches" },
    {
      id: 10,
      label: "Leaderboard",
      icon: "ri-bar-chart-box-line",
      path: "/leaderboard",
    },
    { id: 14, label: "Requests", icon: "ri-link", path: "/requests" },
    { id: 18, label: "Chatbot", icon: "ri-chat-1-line", path: "/help" },
  ];

  // Determine the menu based on role
  let menuItems = [...baseMenuItems];

  if (role === "Athlete") {
    menuItems = [...menuItems, ...athleteMenuItems];
  } else if (role === "Coach") {
    menuItems = [...coachMenuItems];
  } else if (role === "Sponsor") {
    menuItems = [...sponsorMenuItems];
  }

  return (
    <div className="h-full w-72 bg-white shadow-md flex flex-col ">
      <div className="flex items-center gap-4 my-8 px-8">
        <img src={Logo} alt="Vismoh" className="h-12 w-12" />
        <h1 className="uppercase text-2xl font-semibold font-primary text-primary">
          Vismoh
        </h1>
      </div>
      <nav className="flex-1 mt-4 overflow-y-auto">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id} className="w-full">
                <Link
                  to={item.path}
                  className={`flex font-medium items-center gap-4 w-full px-6 py-4 text-lg rounded-md transition-all ${
                    isActive ? "bg-secondary" : "text-primary hover:bg-gray-100"
                  }`}
                >
                  <i className={`${item.icon} text-xl`}></i>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto mb-8 border-t border-gray-200 pt-6 px-6">
        {/* Optional: Profile or Logout section */}
      </div>
    </div>
  );
}
