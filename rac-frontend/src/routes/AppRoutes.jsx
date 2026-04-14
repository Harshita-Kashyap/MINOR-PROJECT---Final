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

<<<<<<< HEAD
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

=======
>>>>>>> 5dc9d00136eab0ad399b093c67808e1c0ba5ed5a
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

<<<<<<< HEAD
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
=======
>>>>>>> 5dc9d00136eab0ad399b093c67808e1c0ba5ed5a
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

        {/* Fallback */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;