import React from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "../../assets/images/signuplogo.png";
export default function Header() {
  return (
    <div className="flex items-center bg-[#F3F7F6] justify-between w-full px-6 py-4 shadow-md">
      {/* Search Bar */}
      <div className="flex items-center bg-white border px-4 py-2 rounded-md w-1/2">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search here"
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Hello, HARI</span>
        <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
          <img src={Logo} alt="User Avatar" className="w-18" />
        </div>
      </div>
    </div>
  );
}
