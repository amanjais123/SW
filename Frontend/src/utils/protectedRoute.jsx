import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if "token" cookie exists
  const isAuthenticated = document.cookie.split("; ").some(cookie => cookie.startsWith("token="));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
