import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { getAdminDashboardStats } from "../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVacancies: 0,
    activeVacancies: 0,
    closedVacancies: 0,
    totalApplications: 0,

    verificationPending: 0,
    verificationEligible: 0,
    verificationReview: 0,
    verificationRejected: 0,

    technicalAssigned: 0,
    technicalSubmitted: 0,
    technicalQualified: 0,
    technicalRejected: 0,

    personalityAssigned: 0,
    personalitySubmitted: 0,

    finalReview: 0,
    selected: 0,
    waitlisted: 0,
    finalRejected: 0,
  });

  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await getAdminDashboardStats();
        const data = res.data?.stats || {};
        const vacancies = data.vacancies || {};
        const applications = data.applications || {};

        setStats({
          totalVacancies: vacancies.totalVacancies || 0,
          activeVacancies: vacancies.activeVacancies || 0,
          closedVacancies: vacancies.closedVacancies || 0,
          totalApplications: applications.totalApplications || 0,

          verificationPending: applications.verificationPending || 0,
          verificationEligible: applications.verificationEligible || 0,
          verificationReview: applications.verificationReview || 0,
          verificationRejected: applications.verificationRejected || 0,

          technicalAssigned: applications.technicalAssigned || 0,
          technicalSubmitted: applications.technicalSubmitted || 0,
          technicalQualified: applications.technicalQualified || 0,
          technicalRejected: applications.technicalRejected || 0,

          personalityAssigned: applications.personalityAssigned || 0,
          personalitySubmitted: applications.personalitySubmitted || 0,

          finalReview: applications.finalReview || 0,
          selected: applications.selected || 0,
          waitlisted: applications.waitlisted || 0,
          finalRejected: applications.finalRejected || 0,
        });
      } catch (error) {
        console.error("Admin dashboard stats error:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  const alerts = [
    `${stats.verificationReview} applications are in verification review.`,
    `${stats.technicalAssigned} candidates have technical tests assigned.`,
    `${stats.finalReview} candidates are waiting in final review.`,
  ];

  const quickActions = [
    {
      title: "Create Vacancy",
      description: "Create a new vacancy with eligibility rules and deadline.",
      to: "/admin/create-vacancy",
      variant: "primary",
    },
    {
      title: "Manage Vacancies",
      description: "Edit, delete, publish, close, and monitor vacancies.",
      to: "/admin/vacancies",
      variant: "outline",
    },
    {
      title: "Monitor Applications",
      description: "View applicant progress across all workflow stages.",
      to: "/admin/applications",
      variant: "secondary",
    },
    {
      title: "View Analytics",
      description: "Track funnel, stage distribution, and final outcomes.",
      to: "/admin/analytics",
      variant: "secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                  Admin Command Center
                </p>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Welcome, {user?.name || "Admin"}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Manage vacancies, users, and system-wide recruitment monitoring.
                  Candidate movement is handled by the system and Selector workflow.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/admin/create-vacancy">
                  <Button variant="secondary">Create Vacancy</Button>
                </Link>

                <Link to="/admin/applications">
                  <Button variant="outlineWhite">Monitor Applications</Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Vacancies" value={stats.totalVacancies} tone="default" />
            <MetricCard title="Open Vacancies" value={stats.activeVacancies} tone="info" />
            <MetricCard title="Applications" value={stats.totalApplications} tone="default" />
            <MetricCard title="Final Review" value={stats.finalReview} tone="warning" />
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Verification Review" value={stats.verificationReview} tone="warning" />
            <MetricCard title="Technical Qualified" value={stats.technicalQualified} tone="success" />
            <MetricCard title="Personality Submitted" value={stats.personalitySubmitted} tone="info" />
            <MetricCard title="Selected" value={stats.selected} tone="success" />
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-7 border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Admin Actions
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Admin controls resources and monitors the process. Admin does not shortlist or decide candidates.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {quickActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>

                    <div className="mt-4">
                      <Link to={action.to}>
                        <Button size="sm" variant={action.variant}>
                          Open
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="xl:col-span-5 border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Monitoring Alerts
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Read-only workflow attention points.
              </p>

              <div className="mt-5 space-y-3">
                {alerts.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm text-gray-800 dark:border-blue-900/60 dark:bg-blue-950/20 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recruitment Pipeline Summary
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              <PipelineItem label="Applied" value={stats.totalApplications} />
              <PipelineItem label="Verification Eligible" value={stats.verificationEligible} />
              <PipelineItem label="Technical Assigned" value={stats.technicalAssigned} />
              <PipelineItem label="Technical Qualified" value={stats.technicalQualified} />
              <PipelineItem label="Personality Submitted" value={stats.personalitySubmitted} />
              <PipelineItem label="Selected" value={stats.selected} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm dark:border-gray-700/70 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
    </Card>
  );
}

function PipelineItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800/60">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;