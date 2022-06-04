import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function RequiresAuth({ children }) {
  const {
    authState: { isLoggedIn }
  } = useAuth();
  // get the private route path
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    // set the private route path in the location state
    <Navigate to="/login" state={{ from: location }} replace />
  );
}