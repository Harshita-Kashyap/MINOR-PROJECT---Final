import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import ApplicantStats from "../components/ApplicantStats";
import VacancyCard from "../components/VacancyCard";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { isProfileComplete, getApplicantName } from "../../../shared/utils/profileStorage";
import { getApplications, getLatestActiveApplication } from "../../../shared/utils/applicationStorage";
import {
  getDashboardSummary,
  getNextAction,
  getStageLabel,
  getStageTone,
  canAccessTechnicalTest,
  canAccessPersonalityTest,
} from "../utils/applicantHelpers";

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const profileComplete = isProfileComplete();
  const applicantName = getApplicantName();

  const vacancies = [
    {
      id: 1,
      title: "Scientist B - Computer Science",
      department: "DRDO RAC",
      deadline: "20 Apr 2026",
      status: "Open",
      location: "Delhi",
      mode: "Online Application",
    },
    {
      id: 2,
      title: "Scientist B - Electronics",
      department: "DRDO RAC",
      deadline: "24 Apr 2026",
      status: "Open",
      location: "Delhi",
      mode: "Online Application",
    },
  ];

  const applications = getApplications();
  const latestApplication = getLatestActiveApplication();
  const summary = getDashboardSummary(applications);

  const stats = [
    { title: "Open Vacancies", value: vacancies.length, tone: "info" },
    { title: "Applications Submitted", value: applications.length, tone: "default" },
    { title: "Pending Actions", value: summary.pendingActions, tone: "warning" },
    { title: "Final Results", value: summary.finalResults, tone: "success" },
  ];

  const quickActions = useMemo(() => {
    const actions = [];

    actions.push({
      title: profileComplete ? "Profile Ready" : "Complete Your Profile",
      description: profileComplete
        ? "Your profile is ready for applications and verification."
        : "Complete required details before applying for a vacancy.",
      actionLabel: profileComplete ? "View Profile" : "Complete Profile",
      onClick: () => navigate("/applicant/profile"),
      variant: profileComplete ? "outline" : "primary",
    });

    actions.push({
      title: "Browse Vacancies",
      description: "Explore active openings and apply to relevant vacancies.",
      actionLabel: "View Vacancies",
      onClick: () => navigate("/applicant/vacancies"),
      variant: "outline",
    });

    if (latestApplication && canAccessTechnicalTest(latestApplication)) {
      actions.push({
        title: "Technical Test Assigned",
        description: "Your application has moved to the technical evaluation stage.",
        actionLabel: "Start Technical Test",
        onClick: () => navigate("/applicant/technical-test"),
        variant: "primary",
      });
    }

    if (latestApplication && canAccessPersonalityTest(latestApplication)) {
      actions.push({
        title: "Personality Test Assigned",
        description: "You are shortlisted for the interview simulation stage.",
        actionLabel: "Start Personality Test",
        onClick: () => navigate("/applicant/personality-test"),
        variant: "primary",
      });
    }

    actions.push({
      title: "Track My Applications",
      description: "Monitor stage-wise progress, updates, and reasons if blocked.",
      actionLabel: "View Applications",
      onClick: () => navigate("/applicant/applications"),
      variant: "outline",
    });

    return actions.slice(0, 4);
  }, [profileComplete, latestApplication, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-white/15 text-white dark:bg-white/15 dark:text-white">
                    Applicant Dashboard
                  </Badge>

                  <Badge
                    className={`border-0 ${
                      profileComplete
                        ? "bg-emerald-500/20 text-emerald-100"
                        : "bg-amber-500/20 text-amber-100"
                    }`}
                  >
                    {profileComplete ? "Profile Ready" : "Profile Incomplete"}
                  </Badge>

                  {latestApplication && (
                    <Badge
                      className={`border-0 ${
                        getStageTone(latestApplication.currentStage) === "danger"
                          ? "bg-red-500/20 text-red-100"
                          : getStageTone(latestApplication.currentStage) === "warning"
                          ? "bg-amber-500/20 text-amber-100"
                          : getStageTone(latestApplication.currentStage) === "success"
                          ? "bg-emerald-500/20 text-emerald-100"
                          : "bg-blue-500/20 text-blue-100"
                      }`}
                    >
                      {getStageLabel(latestApplication.currentStage)}
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
                  Welcome, {applicantName}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-[15px]">
                  Manage your profile, apply for vacancies, track verification,
                  complete assigned assessments, and view stage-wise application outcomes from one place.
                </p>

                {latestApplication && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-blue-100">
                      Current Focus
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-white">
                      {latestApplication.vacancyTitle}
                    </h2>
                    <p className="mt-2 text-sm text-blue-100">
                      Next Action: {getNextAction(latestApplication)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant={profileComplete ? "secondary" : "primary"}
                  onClick={() => navigate("/applicant/profile")}
                >
                  {profileComplete ? "View Profile" : "Complete Profile"}
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/applicant/vacancies")}
                >
                  Browse Vacancies
                </Button>
              </div>
            </div>
          </section>

          <ApplicantStats stats={stats} />

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Priority Actions
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Follow the next logical steps in your recruitment journey.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((item, index) => (
                <Card
                  key={index}
                  className="flex h-full flex-col justify-between border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80"
                >
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button
                      variant={item.variant}
                      size="sm"
                      fullWidth
                      onClick={item.onClick}
                    >
                      {item.actionLabel}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Latest Vacancies
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Explore active opportunities and apply where eligible.
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate("/applicant/vacancies")}
              >
                View All
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Application Progress
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Track verification, assessments, shortlist status, and final outcomes.
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate("/applicant/applications")}
              >
                View All
              </Button>
            </div>

            {applications.length === 0 ? (
              <Card className="text-center">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  No applications yet
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Complete your profile and apply for a vacancy to start your journey.
                </p>
                <div className="mt-5 flex justify-center">
                  <Button onClick={() => navigate("/applicant/vacancies")}>
                    Explore Vacancies
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {applications.slice(0, 4).map((item) => (
                  <ApplicationStatusCard key={item.id} application={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}