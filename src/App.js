import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import RequiresAuth from "./components/RequiresAuth";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const {
    authState: { isLoggedIn },
    dispatchAuth
  } = useAuth();

  const user = window.localStorage.getItem("username");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiresAuth>
            <Dashboard />
          </RequiresAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
