import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// ================= AUTH PAGES =================
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";

// ================= PUBLIC / LANDING PAGES =================
import Landing from "../../features/landing/pages/Landing";
import Chairman from "../../features/landing/pages/Chairman";
import Director from "../../features/landing/pages/Director";
import Approach from "../../features/landing/pages/Approach";
import About from "../../features/landing/pages/About";
import Recruitment from "../../features/landing/pages/Recruitment";
import Assessment from "../../features/landing/pages/Assessment";
import SelectionPG from "../../features/landing/pages/SelectionPG";
import LDCE from "../../features/landing/pages/LDCE";
import Lateral from "../../features/landing/pages/Lateral";
import DirectRecruitment from "../../features/landing/pages/DirectRecruitment";
import DRDS from "../../features/landing/pages/DRDS";
import FAQs from "../../features/landing/pages/FAQs";
import Grahpatrika from "../../features/landing/pages/Grahpatrika";
import CertificateFormats from "../../features/landing/pages/CertificateFormats";
import PdfViewerPage from "../../features/landing/pages/PdfViewerPage";
import FooterPage from "../../features/landing/pages/FooterPage";

// ================= ADMIN PAGES =================
import AdminDashboard from "../../features/admin/pages/AdminDashboard";
import VacancyManagement from "../../features/admin/pages/VacancyManagement";
import CreateVacancy from "../../features/admin/pages/CreateVacancy";
import EditVacancy from "../../features/admin/pages/EditVacancy";
import ApplicationsManagement from "../../features/admin/pages/ApplicationsManagement";
import Shortlisting from "../../features/admin/pages/Shortlisting";
import FinalMeritList from "../../features/admin/pages/FinalMeritList";
import AdminAnalytics from "../../features/admin/pages/AdminAnalytics";

// ================= APPLICANT PAGES =================
import ApplicantDashboard from "../../features/applicant/pages/ApplicantDashboard";
import ApplicantVacancies from "../../features/applicant/pages/ApplicantVacancies";
import ApplicantVacancyDetails from "../../features/applicant/pages/ApplicantVacancyDetails";
import MyApplications from "../../features/applicant/pages/MyApplications";
import ApplicantProfile from "../../features/applicant/pages/ApplicantProfile";

// ================= ASSESSMENT PAGES =================
import TechnicalTest from "../../features/assessment/pages/TechnicalTest";
import PersonalityTest from "../../features/assessment/pages/PersonalityTest";

// ================= SELECTOR PAGES =================
import SelectorDashboard from "../../features/selector/pages/SelectorDashboard";
import SelectorCandidates from "../../features/selector/pages/SelectorCandidates";
import SelectorCandidateDetail from "../../features/selector/pages/SelectorCandidateDetail";
import SelectorEvaluation from "../../features/selector/pages/SelectorEvaluation";
import SelectorAnalytics from "../../features/selector/pages/SelectorAnalytics";
import SelectorEvaluationQueue from "../../features/selector/pages/SelectorEvaluationQueue";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Landing />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

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

        {/* ================= FOOTER ROUTES ================= */}
        <Route path="/footer/archive" element={<FooterPage page="archive" />} />
        <Route path="/footer/web-information-manager" element={<FooterPage page="web-information-manager" />} />
        <Route path="/footer/footer-about-us" element={<FooterPage page="footer-about-us" />} />
        <Route path="/footer/interface-desk" element={<FooterPage page="interface-desk" />} />
        <Route path="/footer/sitemap" element={<FooterPage page="sitemap" />} />
        <Route path="/footer/help" element={<FooterPage page="help" />} />
        <Route path="/footer/refund-cancellation" element={<FooterPage page="refund-cancellation" />} />
        <Route path="/footer/disclaimer" element={<FooterPage page="disclaimer" />} />
        <Route path="/footer/website-policies" element={<FooterPage page="website-policies" />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
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

        {/* ================= APPLICANT ROUTES ================= */}
        <Route path="/applicant" element={<Navigate to="/applicant/dashboard" replace />} />

        <Route
          path="/applicant/dashboard"
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
         path="/applicant/technical-test/:id"
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

        {/* ================= SELECTOR ROUTES ================= */}
        <Route path="/selector" element={<Navigate to="/selector/dashboard" replace />} />

        <Route
          path="/selector/dashboard"
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
          path="/selector/evaluation"
          element={
            <ProtectedRoute allowedRoles={["selector"]}>
              <SelectorEvaluationQueue />
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

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;