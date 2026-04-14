import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import ApplicantDashboard from "../pages/ApplicantDashboard";
import SelectorDashboard from "../pages/SelectorDashboard";
import Landing from "../pages/Landing";

import ApplicantVacancies from "../pages/ApplicantVacancies";
import MyApplications from "../pages/MyApplications";
import TechnicalTest from "../pages/TechnicalTest";
import PersonalityTest from "../pages/PersonalityTest";
import ApplicantProfile from "../pages/ApplicantProfile";
import ApplicantVacancyDetails from "../pages/ApplicantVacancyDetails";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
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

        <Route
          path="/applicant"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/vacancies"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantVacancies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/applications"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/technical-test"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <TechnicalTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/personality-test"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <PersonalityTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/profile"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/vacancies/:id"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantVacancyDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;