const user = JSON.parse(localStorage.getItem("user"));
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import ApplicantDashboard from "../pages/ApplicantDashboard";
import SelectorDashboard from "../pages/SelectorDashboard";

import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/selector"
          element={
            <ProtectedRoute allowedRoles={["selector"]}>
              <SelectorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Landing />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;