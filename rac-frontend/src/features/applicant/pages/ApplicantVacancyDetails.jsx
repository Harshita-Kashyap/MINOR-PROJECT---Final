import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";

import { getVacancyById } from "../services/vacancyService";
import {
  applyToVacancy,
  getApplicantApplications,
  getApplicantProfile,
} from "../services/applicantService";

function formatDate(dateValue) {
  if (!dateValue) return "N/A";

  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getVacancyIdFromApplication(app) {
  if (!app?.vacancyId) return null;
  return typeof app.vacancyId === "object" ? app.vacancyId._id : app.vacancyId;
}

export default function ApplicantVacancyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacancy, setVacancy] = useState(null);
  const [applications, setApplications] = useState([]);
  const [profileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const existingApplication = useMemo(() => {
    return applications.find((app) => getVacancyIdFromApplication(app) === id);
  }, [applications, id]);

  const applied = Boolean(existingApplication);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vacancyData, profileData, applicationsData] = await Promise.all([
          getVacancyById(id),
          getApplicantProfile(),
          getApplicantApplications(),
        ]);

        setVacancy(vacancyData);
        setApplications(applicationsData || []);

        setProfileComplete(
          profileData?.profile?.profileStatus === "COMPLETE"
        );
      } catch (err) {
        console.error("Error:", err);
        alert(err.message || "Error loading vacancy details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleApply = async () => {
    if (!profileComplete) {
      alert("Please complete your profile first");
      navigate("/applicant/profile");
      return;
    }

    if (vacancy?.status !== "OPEN") {
      alert("This vacancy is not open for applications");
      return;
    }

    try {
      setApplying(true);

      const data = await applyToVacancy(id);

      setApplications((prev) => [data.application, ...prev]);

      alert("Applied Successfully ✅");
    } catch (err) {
      alert(err.message || "Error applying");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />
        <ApplicantRibbon />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <Card>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading vacancy details...
            </p>
          </Card>
        </main>
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />
        <ApplicantRibbon />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <Card className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vacancy not found
            </h2>
            <div className="mt-5">
              <Button onClick={() => navigate("/applicant/vacancies")}>
                Back to Vacancies
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vacancy.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {vacancy.department}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant={vacancy.status === "OPEN" ? "success" : "warning"}>
                  {vacancy.status}
                </Badge>

                {applied && (
                  <Badge variant="info">
                    Applied
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <p className="text-gray-700 dark:text-gray-300">
                <b>Location:</b> {vacancy.location || "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Mode:</b> {vacancy.mode || "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Deadline:</b> {formatDate(vacancy.deadline)}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Total Posts:</b> {vacancy.totalPosts ?? "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Advertisement No:</b> {vacancy.advertisementNo || "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Experience:</b> {vacancy.experience || "N/A"}
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Eligibility
            </h2>
            <p className="leading-7 text-gray-600 dark:text-gray-300">
              {vacancy.eligibility || "Eligibility details not provided."}
            </p>

            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <p className="text-gray-700 dark:text-gray-300">
                <b>Discipline:</b> {vacancy.discipline || "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Exam Required:</b> {vacancy.examTypeRequired || "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Min Graduation %:</b>{" "}
                {vacancy.minGraduationPercentage ?? "N/A"}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <b>Min GATE Score:</b> {vacancy.minGateScore ?? "N/A"}
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Description
            </h2>
            <p className="leading-7 text-gray-600 dark:text-gray-300">
              {vacancy.description || "No description available."}
            </p>
          </Card>

          {existingApplication && (
            <Card>
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Your Application Status
              </h2>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    existingApplication.verificationStatus === "ELIGIBLE"
                      ? "success"
                      : existingApplication.verificationStatus === "REJECTED"
                      ? "danger"
                      : "warning"
                  }
                >
                  {existingApplication.verificationStatus}
                </Badge>

                <Badge variant="info">
                  {existingApplication.currentStage}
                </Badge>
              </div>

              {existingApplication.verificationReason && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  <b>Reason:</b> {existingApplication.verificationReason}
                </p>
              )}
            </Card>
          )}

          {!profileComplete && !applied && (
            <Card>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                ⚠ Please complete your profile before applying.
              </p>
            </Card>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => navigate("/applicant/vacancies")}
            >
              Back
            </Button>

            <Button
              onClick={handleApply}
              disabled={
                applied ||
                applying ||
                !profileComplete ||
                vacancy.status !== "OPEN"
              }
            >
              {applied
                ? "Applied"
                : applying
                ? "Applying..."
                : !profileComplete
                ? "Complete Profile First"
                : vacancy.status !== "OPEN"
                ? "Vacancy Closed"
                : "Apply Now"}
            </Button>

            {applied && (
              <Button
                variant="ghost"
                onClick={() => navigate("/applicant/applications")}
              >
                View My Application
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}