import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Header from "./common/Header";
import Hello from "./common/Hello";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header Positioned at the Top */}
        <Header />
        <Hello />

        {/* Main Content */}
        <div className="flex-1 p-6 pl-10 pt-3 overflow-auto bg-gray-100">
          <Outlet /> {/* This will render the current route's content */}
        </div>
      </div>
    </div>
  );
}
