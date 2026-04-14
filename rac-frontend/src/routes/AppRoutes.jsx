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

import ApplicantVacancies from "../pages/ApplicantVacancies";
import MyApplications from "../pages/MyApplications";
import TechnicalTest from "../pages/TechnicalTest";
import PersonalityTest from "../pages/PersonalityTest";

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

       <Route
  path="/selector/candidates"
  element={
    <ProtectedRoute allowedRoles={["selector"]}>
      <SelectorCandidates />
    </ProtectedRoute>
  }
/>

<Route
  path="/selector/candidate/:id"
  element={
    <ProtectedRoute allowedRoles={["selector"]}>
      <SelectorCandidateDetail />
    </ProtectedRoute>
  }
/>

<Route
  path="/selector/evaluation/:id"
  element={
    <ProtectedRoute allowedRoles={["selector"]}>
      <SelectorEvaluation />
    </ProtectedRoute>
  }
/>

<Route
  path="/selector/analytics"
  element={
    <ProtectedRoute allowedRoles={["selector"]}>
      <SelectorAnalytics />
    </ProtectedRoute>
  }
/>

        {/* Default */}
        <Route path="*" element={<Landing />} />

        <Route path="/applicant" element={<ApplicantDashboard />} />
        <Route path="/applicant/vacancies" element={<ApplicantVacancies />} />
        <Route path="/applicant/applications" element={<MyApplications />} />
        <Route path="/applicant/technical-test" element={<TechnicalTest />} />
        <Route path="/applicant/personality-test" element={<PersonalityTest />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;