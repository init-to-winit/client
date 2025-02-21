import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // ✅ Ensure correct import

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // ✅ Access user state

  if (loading) return <p>Loading...</p>; // ✅ Show a loading state

  if (!user) {
    return <Navigate to="/login" />; // ✅ Redirect unauthorized users
  }

  return <Outlet />; // ✅ Allow access to protected routes
};

export default ProtectedRoute;
