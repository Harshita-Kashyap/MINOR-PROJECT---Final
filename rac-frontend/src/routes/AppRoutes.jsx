import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import ProtectedRoute from "./ProtectedRoute";
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
import CertificateFormats from "../pages/CertificateFormats";
import PdfViewerPage from "../pages/PdfViewerPage";

import AdminDashboard from "../pages/AdminDashboard";
import VacancyManagement from "../pages/VacancyManagement";
import CreateVacancy from "../pages/CreateVacancy";
import ApplicationsManagement from "../pages/ApplicationsManagement";
import Shortlisting from "../pages/Shortlisting";
import FinalMeritList from "../pages/FinalMeritList";
import EditVacancy from "../pages/EditVacancy";

import ApplicantDashboard from "../pages/ApplicantDashboard";
import ApplicantVacancies from "../pages/ApplicantVacancies";
import MyApplications from "../pages/MyApplications";
import TechnicalTest from "../pages/TechnicalTest";
import PersonalityTest from "../pages/PersonalityTest";
import ApplicantProfile from "../pages/ApplicantProfile";
import ApplicantVacancyDetails from "../pages/ApplicantVacancyDetails";

import SelectorDashboard from "../pages/SelectorDashboard";
import SelectorCandidates from "../pages/SelectorCandidates";
import SelectorCandidateDetail from "../pages/SelectorCandidateDetail";
import SelectorEvaluation from "../pages/SelectorEvaluation";
import SelectorAnalytics from "../pages/SelectorAnalytics";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        <Route path="/certificate-formats" element={<CertificateFormats />} />
        <Route path="/certificate-formats/:pdfKey" element={<PdfViewerPage />} />

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
          path="/admin/results"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FinalMeritList />
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
          path="/applicant/vacancies/:id"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantVacancyDetails />
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
          path="/selector"
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

        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;