import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

export default function Sidebar() {
  const location = useLocation(); // Get current route

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "ri-dashboard-line",
      path: "/dashboard",
    },
    { id: 2, label: "Dietary", icon: "ri-leaf-line", path: "/dietary" },
    {
      id: 3,
      label: "Healthcare",
      icon: "ri-heart-pulse-line",
      path: "/healthcare",
    },
    { id: 4, label: "Sponsors", icon: "ri-file-list-line", path: "/sponsors" },
    { id: 5, label: "Coaches", icon: "ri-user-star-line", path: "/coaches" },
  ];

  return (
    <div className="h-full w-72 bg-white shadow-md flex flex-col">
      {" "}
      {/* Increased width to w-72 (18rem) */}
      <div className="flex items-center gap-4 my-8 px-8">
        <img src={Logo} alt="Vismoh" className="h-12 w-12" />
        <h1 className="uppercase text-2xl font-semibold font-primary text-primary">
          Vismoh
        </h1>
      </div>
      <nav className="flex-1 mt-4">
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
