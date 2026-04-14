import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import ApplicantDashboard from "../pages/ApplicantDashboard";
import SelectorDashboard from "../pages/SelectorDashboard";

import Landing from "../pages/Landing";
import Chairman from "../pages/Chairman";
import Director from "../pages/Director";
import Approach from "../pages/Approach";
import About from "../pages/About";
import Recruitment from "../pages/Recruitment";
import Assessment from "../pages/Assessment";
import SelectionPG from "../pages/SelectionPG";
import LDCE from "../pages/LDCE";
import Lateral from "../pages/Lateral";
import DirectRecruitment from "../pages/DirectRecruitment";
import DRDS from "../pages/DRDS";
import FAQs from "../pages/FAQs";
import Grahpatrika from "../pages/Grahpatrika";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/chairman" element={<Chairman />} />
        <Route path="/director" element={<Director />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/about" element={<About />} />
        <Route path="/programmes/recruitment" element={<Recruitment />} />
        <Route path="/programmes/assessment" element={<Assessment />} />
        <Route path="/programmes/selection-pg" element={<SelectionPG />} />
        <Route path="/programmes/ldce" element={<LDCE />} />
        <Route path="/lateral" element={<Lateral />} />
        <Route path="/direct-recruitment" element={<DirectRecruitment />} />
        <Route path="/drds" element={<DRDS />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/grahpatrika" element={<Grahpatrika />} />

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

        {/* Fallback */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;