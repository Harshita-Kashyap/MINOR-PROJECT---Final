import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import ApplicantStats from "../components/ApplicantStats";
import VacancyCard from "../components/VacancyCard";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  getStageLabel,
  getStageTone,
  normalizeStage,
  APPLICATION_STAGES,
} from "../utils/applicantHelpers";

import {
  getApplicantApplications,
  getApplicantProfile,
  applyToVacancy,
} from "../services/applicantService";

function getVacancyId(value) {
  return typeof value === "object" ? value?._id : value;
}

function getLatestStage(application) {
  const timeline = application?.timeline;

  if (Array.isArray(timeline) && timeline.length > 0) {
    return normalizeStage(timeline[timeline.length - 1]?.stage);
  }

  return normalizeStage(application?.currentStage);
}

export default function ApplicantDashboard() {
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileData, vacancyRes, applicationsData] = await Promise.all([
          getApplicantProfile(),
          fetch("http://localhost:5000/api/vacancies").then((res) => res.json()),
          getApplicantApplications(),
        ]);

        setProfile(profileData?.profile || null);
        setVacancies(Array.isArray(vacancyRes?.vacancies) ? vacancyRes.vacancies : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const applicantName = profile?.fullName || "Applicant";
  const profileComplete = profile?.profileStatus === "COMPLETE";

  const latestApplication = applications[0];
  const latestStage = getLatestStage(latestApplication);

  const pendingActions = applications.filter((app) =>
    [
      APPLICATION_STAGES.VERIFICATION_REVIEW,
      APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
      APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
      APPLICATION_STAGES.FINAL_REVIEW,
    ].includes(normalizeStage(app.currentStage))
  ).length;

  const finalResults = applications.filter((app) =>
    [
      APPLICATION_STAGES.SELECTED,
      APPLICATION_STAGES.WAITLISTED,
      APPLICATION_STAGES.FINAL_REJECTED,
    ].includes(normalizeStage(app.currentStage))
  ).length;

  const stats = [
    { title: "Open Vacancies", value: vacancies.length, tone: "info" },
    { title: "Applications Submitted", value: applications.length, tone: "default" },
    { title: "Pending Actions", value: pendingActions, tone: "warning" },
    { title: "Final Results", value: finalResults, tone: "success" },
  ];

  const appliedVacancyIds = applications.map((app) => getVacancyId(app.vacancyId));

  const quickActions = useMemo(
    () => [
      {
        title: profileComplete ? "Profile Ready" : "Complete Profile",
        description: profileComplete
          ? "Your profile is ready for vacancy applications and verification."
          : "Complete your applicant profile before applying for vacancies.",
        actionLabel: profileComplete ? "View Profile" : "Complete Profile",
        onClick: () => navigate("/applicant/profile"),
        variant: profileComplete ? "outline" : "primary",
      },
      {
        title: "Browse Vacancies",
        description: "Explore active openings and apply to suitable roles.",
        actionLabel: "View Vacancies",
        onClick: () => navigate("/applicant/vacancies"),
        variant: "outline",
      },
      {
        title: "Track Applications",
        description: "View stage-wise progress, scores, remarks, and final results.",
        actionLabel: "View Applications",
        onClick: () => navigate("/applicant/applications"),
        variant: "outline",
      },
    ],
    [profileComplete, navigate]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />
        <ApplicantRibbon />

        <main className="mx-auto max-w-7xl px-4 py-6">
          <Card className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading dashboard...
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

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                  Applicant Control Center
                </p>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Welcome, {applicantName}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Complete your profile, apply for active vacancies, attempt assigned
                  assessments, and track your complete RAC recruitment journey in one place.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="border-0 bg-white/15 text-white dark:bg-white/15 dark:text-white">
                    {profileComplete ? "Profile Ready" : "Profile Incomplete"}
                  </Badge>

                  {latestApplication && (
                    <Badge
                      className={`border-0 ${getStageTone(latestStage) === "success"
                        ? "bg-emerald-500/20 text-emerald-100"
                        : getStageTone(latestStage) === "warning"
                          ? "bg-amber-500/20 text-amber-100"
                          : getStageTone(latestStage) === "danger"
                            ? "bg-red-500/20 text-red-100"
                            : "bg-blue-500/20 text-blue-100"
                        }`}
                    >
                      {getStageLabel(latestStage)}
                    </Badge>
                  )}
                </div>

                {latestApplication && (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-blue-100">
                      Latest Application
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white">
                      {latestApplication.vacancyTitle}
                    </h2>

                    <p className="mt-1 text-sm text-blue-100">
                      Current stage: {getStageLabel(latestStage)}
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

          <section className="grid gap-4 md:grid-cols-3">
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
                    size="sm"
                    variant={item.variant}
                    fullWidth
                    onClick={item.onClick}
                  >
                    {item.actionLabel}
                  </Button>
                </div>
              </Card>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Latest Vacancies
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Recently available vacancies for applicant submission.
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

            {vacancies.length === 0 ? (
              <Card className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  No vacancies available right now.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {vacancies.slice(0, 4).map((vacancy) => {
                  const isApplied = appliedVacancyIds.includes(vacancy._id);

                  return (
                    <Card
                      key={vacancy._id}
                      className="flex items-center justify-between gap-4 border border-gray-200/80 p-4 dark:border-gray-700/80"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {vacancy.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {vacancy.department || "DRDO RAC"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant={vacancy.status === "OPEN" ? "success" : "warning"}>
                            {vacancy.status || "OPEN"}
                          </Badge>

                          {isApplied && (
                            <Badge variant="info">
                              Applied
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={isApplied ? "outline" : "primary"}
                        onClick={() => navigate("/applicant/vacancies")}
                      >
                        {isApplied ? "View" : "Apply"}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            )}

          </section>

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Application Progress
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Stage-wise recruitment status, scores, timeline, and final decisions.
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
                  Apply to a vacancy to start tracking your recruitment progress.
                </p>

                <div className="mt-5 flex justify-center">
                  <Button onClick={() => navigate("/applicant/vacancies")}>
                    Apply Now
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {applications.slice(0, 4).map((app) => {
                  const stage = normalizeStage(app.currentStage);

                  return (
                    <Card
                      key={app._id || app.applicationId}
                      className="flex items-center justify-between border border-gray-200/80 p-4 dark:border-gray-700/80"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {app.vacancyTitle}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {app.department}
                        </p>

                        <div className="mt-2">
                          <Badge variant={getStageTone(stage)}>
                            {getStageLabel(stage)}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate("/applicant/applications")}
                      >
                        View
                      </Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}