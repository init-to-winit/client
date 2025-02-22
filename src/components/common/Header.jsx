import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io"; // Dropdown arrow icon
import Logo from "../../assets/images/signuplogo.png";
import { useAuth } from "../auth/AuthProvider";

export default function Header() {
  const { logout } = useAuth();
  const [name, setName] = useState("Athlete"); // Default name
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role || "";
  const id = user?.id || "";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setName(storedUser.name);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    logout();
  };
  const handleNavigate = () => {
    navigate(`/athleteProfile/${athleteId}`);
  };

  return (
    <div className="flex items-center bg-[#F3F7F6] justify-between w-full px-6 py-4 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-white border px-4 py-2 rounded-md w-1/2">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search here"
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>

      {/* User Info + Dropdown */}
      <div className="flex items-center space-x-4 relative">
        <span className="text-gray-600">Hello, {name}</span>

        <div
          className=" flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex w-10 h-10 rounded-full bg-green-100 ">
            <img src={Logo} alt="User Avatar" className="w-18" />
          </div>
          <IoIosArrowDown className=" text-gray-500 text-lg" />
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-16 right-0 bg-white rounded-md shadow-lg py-2 w-40 z-50">
            {role === "Athlete" && (
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => navigate(`/athleteProfile/${id}`)}
              >
                Profile
              </button>
            )}

            <button
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => navigate("/help")}
            >
              Help
            </button>
            <button
              className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
