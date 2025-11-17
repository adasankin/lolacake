import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function readUser() {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
}

export default function RequireAuth({ children }) {
  const user = readUser();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}
