import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getApplications } from "../../../shared/utils/applicationStorage";
import {
  getNextAction,
  getStageLabel,
  getStageTone,
} from "../utils/applicantHelpers";

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
  const applications = useMemo(() => getApplications(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 transition-colors dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
                Monitor every application stage, status update, and decision reason.
              </p>
            </div>

            <Button variant="outline" onClick={() => navigate("/applicant/vacancies")}>
              Browse Vacancies
            </Button>
          </section>

          {applications.length === 0 ? (
            <Card className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                No applications found
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Once you apply for a vacancy, you will be able to track its full progress here.
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
                  key={app.id}
                  className="border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getStageTone(app.currentStage)}>
                          {getStageLabel(app.currentStage)}
                        </Badge>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                        {app.vacancyTitle}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {app.department}
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
                          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Applied On
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.appliedAt)}
                          </p>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
                          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Last Updated
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(app.lastUpdatedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/20">
                        <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-400">
                          Next Action
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                          {getNextAction(app)}
                        </p>
                      </div>

                      {(app.verificationReason || app.technicalRemarks || app.finalReason) && (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 dark:border-amber-900/60 dark:bg-amber-950/20">
                          <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400">
                            Remark / Reason
                          </p>
                          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                            {app.finalReason || app.technicalRemarks || app.verificationReason}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 lg:w-48">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/applicant/applications")}
                      >
                        View Details
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