import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getApplicantApplications } from "../services/applicantService";

function formatDate(dateValue) {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateValue) {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusMessage(app) {
  switch (app.currentStage) {
    case "VERIFICATION_PENDING":
      return "Your profile is being verified.";

    case "VERIFICATION_ELIGIBLE":
      return "You are eligible. Technical test will be assigned after the vacancy deadline.";

    case "VERIFICATION_REVIEW":
      return "Your application needs manual review.";

    case "VERIFICATION_REJECTED":
      return "Your application was rejected during eligibility verification.";

    case "TECHNICAL_TEST_ASSIGNED":
      return "Technical test has been assigned.";

    case "TECHNICAL_TEST_SUBMITTED":
      return "Technical test submitted. Result will be declared after cutoff.";

    case "TECHNICAL_QUALIFIED":
      return "You have qualified the technical cutoff. Personality test will be assigned next.";

    case "TECHNICAL_REJECTED":
      return "You did not qualify the technical cutoff.";

    case "PERSONALITY_TEST_ASSIGNED":
      return "Personality test has been assigned.";

    case "FINAL_REVIEW":
      return "Your application is under final review.";

    case "SELECTED":
      return "Congratulations! You have been selected.";

    case "WAITLISTED":
      return "You have been waitlisted.";

    case "FINAL_REJECTED":
      return "You were not selected in the final stage.";

    default:
      return "Track your application progress.";
  }
}

function getVerificationBadgeVariant(status) {
  if (status === "ELIGIBLE") return "success";
  if (status === "REJECTED") return "danger";
  return "warning";
}

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicantApplications();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Error:", err);
        alert(err.message || "Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Card className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading applications...
            </p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                My Applications
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Monitor your application status and progress.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/applicant/vacancies")}
            >
              Browse Vacancies
            </Button>
          </section>

          {applications.length === 0 ? (
            <Card className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                No applications found
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Once you apply for a vacancy, it will appear here.
              </p>

              <div className="mt-5 flex justify-center">
                <Button onClick={() => navigate("/applicant/vacancies")}>
                  Explore Vacancies
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <Card
                  key={app._id}
                  className="border border-gray-200/80 shadow-sm hover:shadow-md dark:border-gray-700/80"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={getVerificationBadgeVariant(app.verificationStatus)}>
                          {app.verificationStatus || "PENDING"}
                        </Badge>

                        <Badge variant="info">
                          {app.currentStage || "UNKNOWN"}
                        </Badge>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                        {app.vacancyTitle}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {app.department}
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {getStatusMessage(app)}
                      </p>

                      {app.verificationReason && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <strong>Reason:</strong> {app.verificationReason}
                        </p>
                      )}

                      {app.technicalRemarks && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <strong>Technical Remark:</strong> {app.technicalRemarks}
                        </p>
                      )}

                      {app.technicalScore !== null && app.technicalScore !== undefined && (
                        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                            Technical Result
                          </p>

                          <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            <strong>Score:</strong> {app.technicalScore}
                          </p>
                        </div>
                      )}

                      {app.technicalTestScheduleId && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                            Technical Test Schedule
                          </p>

                          <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            <strong>Start:</strong>{" "}
                            {formatDateTime(app.technicalTestScheduleId.startTime)}
                          </p>

                          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                            <strong>End:</strong>{" "}
                            {formatDateTime(app.technicalTestScheduleId.endTime)}
                          </p>

                          {app.technicalTestScheduleId.resultDeclarationDate && (
                            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                              <strong>Result Declaration:</strong>{" "}
                              {formatDateTime(
                                app.technicalTestScheduleId.resultDeclarationDate
                              )}
                            </p>
                          )}

                          {app.technicalTestScheduleId.cutoff !== null &&
                            app.technicalTestScheduleId.cutoff !== undefined && (
                              <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                                <strong>Cutoff:</strong>{" "}
                                {app.technicalTestScheduleId.cutoff}
                              </p>
                            )}
                        </div>
                      )}

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/40">
                          <p className="text-xs text-gray-500">Applied On</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.createdAt)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-900/40">
                          <p className="text-xs text-gray-500">Last Updated</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button
                        disabled={app.currentStage !== "TECHNICAL_TEST_ASSIGNED"}
                        onClick={() => navigate(`/applicant/technical-test/${app._id}`)}
                      >
                        {app.currentStage === "TECHNICAL_TEST_ASSIGNED"
                          ? "Start Technical Test"
                          : app.currentStage === "TECHNICAL_TEST_SUBMITTED"
                          ? "Test Submitted"
                          : "Test Not Assigned"}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => navigate("/applicant/vacancies")}
                      >
                        View Vacancies
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={() => navigate("/applicant/dashboard")}
                      >
                        Back to Dashboard
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}