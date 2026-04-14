import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import ApplicantDashboard from "../pages/ApplicantDashboard";
import SelectorDashboard from "../pages/SelectorDashboard";

// 🔵 Admin Pages
import VacancyManagement from "../pages/VacancyManagement";
import CreateVacancy from "../pages/CreateVacancy";
import EditVacancy from "../pages/EditVacancy";
import ApplicationsManagement from "../pages/ApplicationsManagement";
import Shortlisting from "../pages/Shortlisting";
import AdminAnalytics from "../pages/AdminAnalytics";
import FinalMeritList from "../pages/FinalMeritList";

// (Optional future pages for others)
// import ApplicantVacancies from "../pages/ApplicantVacancies";
// import SelectorCandidates from "../pages/SelectorCandidates";

import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vacancies"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <VacancyManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-vacancy"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateVacancy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-vacancy/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditVacancy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ApplicationsManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shortlisting"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Shortlisting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/merit-list"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FinalMeritList />
            </ProtectedRoute>
          }
        />

        {/* ================= APPLICANT ROUTES ================= */}
        <Route
          path="/applicant"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= SELECTOR ROUTES ================= */}
        <Route
          path="/selector"
          element={
            <ProtectedRoute allowedRoles={["selector"]}>
              <SelectorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback Route */}
        <Route path="*" element={<Landing />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;