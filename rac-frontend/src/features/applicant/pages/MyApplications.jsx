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

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicantApplications();
        setApplications(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        alert(err.message || "Error fetching applications");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">

          {/* HEADER */}
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

          {/* EMPTY STATE */}
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

                    {/* LEFT SIDE */}
                    <div className="flex-1">

                      {/* VERIFICATION STATUS */}
                      <Badge
                        variant={
                          app.verificationStatus === "ELIGIBLE"
                            ? "success"
                            : app.verificationStatus === "REJECTED"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {app.verificationStatus || "PENDING"}
                      </Badge>

                      {/* TITLE */}
                      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                        {app.vacancyTitle}
                      </h3>

                      {/* DEPARTMENT */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {app.department}
                      </p>

                      {/* STATUS MESSAGE */}
                      <p className="mt-2 text-sm font-medium">
                        {app.currentStage === "VERIFICATION_PENDING" &&
                          "Your profile is being verified."}

                        {app.currentStage === "VERIFICATION_ELIGIBLE" &&
                          "You are eligible. Technical test will be assigned after the vacancy deadline."}

                        {app.currentStage === "VERIFICATION_REVIEW" &&
                          "Your application needs manual review."}

                        {app.currentStage === "VERIFICATION_REJECTED" &&
                          "Your application was rejected during eligibility verification."}

                        {app.currentStage === "TECHNICAL_TEST_ASSIGNED" &&
                          "Technical test has been assigned."}
                      </p>

                      {app.verificationReason && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          <strong>Reason:</strong> {app.verificationReason}
                        </p>
                      )}

                      {/* DATES */}
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl">
                          <p className="text-xs text-gray-500">
                            Applied On
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.createdAt)}
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl">
                          <p className="text-xs text-gray-500">
                            Last Updated
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.updatedAt)}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col gap-2 lg:w-48">

                      {/* TECHNICAL TEST BUTTON */}
                      <Button
                        disabled={app.currentStage !== "TECHNICAL_TEST_ASSIGNED"}
                        onClick={() => navigate(`/applicant/technical-test/${app._id}`)}
                      >
                        {app.currentStage === "TECHNICAL_TEST_ASSIGNED"
                          ? "Start Technical Test"
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