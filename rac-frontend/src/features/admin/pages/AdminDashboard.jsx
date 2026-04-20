import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";

function AdminDashboard() {
  const [stats, setStats] = useState({
    activeVacancies: 0,
    totalApplications: 0,
    verificationReview: 0,
    finalReviewPending: 0,
    resultsPending: 0,
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
    // Later replace with admin dashboard API
    setStats({
      activeVacancies: 10,
      totalApplications: 45,
      verificationReview: 6,
      finalReviewPending: 8,
      resultsPending: 3,
    });
  }, []);

  const priorityItems = [
    "6 applications require verification review.",
    "8 candidates are waiting in final review or selector decision stage.",
    "3 result sets are ready for final publication.",
  ];

  const recentActivity = [
    ` ${stats.activeVacancies} active vacancies currently open`,
    ` ${stats.totalApplications} total applications received`,
    ` ${stats.verificationReview} candidates under review`,
    ` ${stats.resultsPending} result actions pending publication`,
  ];

  const quickActions = [
    {
      title: "Create Vacancy",
      description: "Start a new recruitment cycle with eligibility and stage rules.",
      to: "/admin/create-vacancy",
      variant: "primary",
    },
    {
      title: "Manage Vacancies",
      description: "Edit, close, and monitor all active and expired vacancies.",
      to: "/admin/vacancies",
      variant: "outline",
    },
    {
      title: "Review Applications",
      description: "Inspect stage-wise applicant movement across the system.",
      to: "/admin/applications",
      variant: "secondary",
    },
    {
      title: "Run Shortlisting",
      description: "Preview and control shortlisting progression to next stages.",
      to: "/admin/shortlisting",
      variant: "secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
                  Configure vacancies, monitor recruitment flow, control shortlisting,
                  and publish final outcomes across the full RAC simulation process.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/admin/create-vacancy">
                  <Button variant="secondary">Create Vacancy</Button>
                </Link>

                <Link to="/admin/vacancies">
                  <Button variant="outlineWhite">Manage Vacancies</Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              title="Active Vacancies"
              value={stats.activeVacancies}
              tone="info"
              description="Open recruitment cycles available for applicants."
            />
            <MetricCard
              title="Applications"
              value={stats.totalApplications}
              tone="default"
              description="Total applications received across active vacancies."
            />
            <MetricCard
              title="Verification Review"
              value={stats.verificationReview}
              tone="warning"
              description="Profiles needing admin or system review attention."
            />
            <MetricCard
              title="Final Review Pending"
              value={stats.finalReviewPending}
              tone="danger"
              description="Candidates waiting for final recommendation closure."
            />
            <MetricCard
              title="Results Pending"
              value={stats.resultsPending}
              tone="success"
              description="Result sets ready for merit confirmation or publishing."
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-7 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Priority Actions
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Direct access to high-impact administrative controls.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {quickActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
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

            <Card className="xl:col-span-5 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Operational Alerts
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    What needs attention right now.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {priorityItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-gray-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-7 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recruitment Pipeline Summary
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    High-level movement of candidates across the recruitment flow.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <PipelineItem label="Applied" value={stats.totalApplications} />
                <PipelineItem label="Verification Review" value={stats.verificationReview} />
                <PipelineItem label="Final Review" value={stats.finalReviewPending} />
                <PipelineItem label="Results Pending" value={stats.resultsPending} />
              </div>
            </Card>

            <Card className="xl:col-span-5 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Snapshot of current system activity.
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {recentActivity.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}

function PipelineItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;