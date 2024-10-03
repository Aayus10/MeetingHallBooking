import SecureLS from "secure-ls";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ls = new SecureLS({ encodingType: "aes" });

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const user = ls.get("users");
  return user ? user : null;
};

const hasAdminAccess = (user, location) => {
  const restrictedUserRoutes = [
    "/hallslist",
    "/bookingform",
    "/userhome",
    "/notifications",
  ];

  if (
    user.role === "admin" &&
    restrictedUserRoutes.includes(location.pathname)
  ) {
    return false;
  }

  return true;
};

const hasUserAccess = (user, location) => {
  const restrictedUserRoutes = ["/adminhome", "/validatebooking"];

  if (
    user.role === "user" &&
    restrictedUserRoutes.includes(location.pathname)
  ) {
    return false;
  }

  return true;
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = isAuthenticated();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!hasAdminAccess(user, location)) {
    return <Navigate to="/adminhome" />;
  }

  if (!hasUserAccess(user, location)) {
    return <Navigate to="/userhome" />;
  }

  return children;
};

export default ProtectedRoute;
