import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import ApplicantDashboard from "../pages/ApplicantDashboard";
import SelectorDashboard from "../pages/SelectorDashboard";
import SelectorCandidates from "../pages/SelectorCandidates";
import SelectorCandidateDetail from "../pages/SelectorCandidateDetail";
import SelectorEvaluation from "../pages/SelectorEvaluation";
import SelectorAnalytics from "../pages/SelectorAnalytics";

import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Applicant */}
        <Route
          path="/applicant"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔥 SELECTOR (UPDATED) */}
        <Route
          path="/selector/*"
          element={
            <ProtectedRoute allowedRoles={["selector"]}>
              <SelectorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👇 NESTED SELECTOR ROUTES */}
        <Route
          path="/selector/candidates"
          element={<SelectorCandidates />}
        />
        <Route
          path="/selector/candidate/:id"
          element={<SelectorCandidateDetail />}
        />
        <Route
          path="/selector/evaluation/:id"
          element={<SelectorEvaluation />}
        />
        <Route
          path="/selector/analytics"
          element={<SelectorAnalytics />}
        />

        {/* Default */}
        <Route path="*" element={<Landing />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;