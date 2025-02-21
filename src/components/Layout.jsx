import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <Outlet /> {/* This will render the current route's content */}
      </div>
    </div>
  );
}
