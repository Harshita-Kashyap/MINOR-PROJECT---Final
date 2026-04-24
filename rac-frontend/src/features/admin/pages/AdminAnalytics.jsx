import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    activeVacancies: 0,
    totalApplications: 0,
    verificationReview: 0,
    finalReviewPending: 0,
    selectionRate: 0,
    applicationsPerDay: 0,
    shortlisted: 0,
    selected: 0,
  });

  useEffect(() => {
    // Replace later with real admin analytics API
    setAnalytics({
      activeVacancies: 8,
      totalApplications: 120,
      verificationReview: 14,
      finalReviewPending: 9,
      selectionRate: 27,
      applicationsPerDay: 18,
      shortlisted: 32,
      selected: 12,
    });
  }, []);

  const funnelData = useMemo(
    () => [
      { label: "Applied", value: analytics.totalApplications },
      { label: "Verification Review", value: analytics.verificationReview },
      { label: "Shortlisted", value: analytics.shortlisted },
      { label: "Final Review", value: analytics.finalReviewPending },
      { label: "Selected", value: analytics.selected },
    ],
    [analytics]
  );

  const vacancyInsights = [
    "Highest application activity is currently concentrated in Computer Science roles.",
    "Verification review backlog is building and may delay technical stage assignment.",
    "Final review decisions should be cleared before result publication begins.",
  ];

  const operationalInsights = [
    "Applications increased steadily this week across active vacancies.",
    "Selection conversion remains healthy for high-merit technical roles.",
    "Mechanical and niche discipline vacancies may need stronger visibility or outreach.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Recruitment Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor vacancy performance, application progression, and administrative bottlenecks across the recruitment workflow.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Active Vacancies"
              value={analytics.activeVacancies}
              description="Open recruitment cycles currently running."
              tone="info"
            />
            <MetricCard
              title="Applications / Day"
              value={analytics.applicationsPerDay}
              description="Average incoming application volume."
              tone="success"
            />
            <MetricCard
              title="Selection Rate"
              value={`${analytics.selectionRate}%`}
              description="Selected candidates compared to total applicants."
              tone="warning"
            />
            <MetricCard
              title="Final Review Pending"
              value={analytics.finalReviewPending}
              description="Candidates waiting for final workflow closure."
              tone="danger"
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-7 border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recruitment Funnel Snapshot
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    High-level movement of candidates through the recruitment process.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {funnelData.map((item) => (
                  <FunnelCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </Card>

            <Card className="xl:col-span-5 border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Admin Signals
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Immediate workflow observations for administrative action.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <SignalItem text={`${analytics.verificationReview} applications currently require verification review.`} />
                <SignalItem text={`${analytics.finalReviewPending} candidates are still pending final review or selector closure.`} />
                <SignalItem text={`${analytics.selected} candidates are already in the selected pool for result preparation.`} />
              </div>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Vacancy Insights
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Trends connected to vacancy demand and processing.
                </p>
              </div>

              <ul className="space-y-3">
                {vacancyInsights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Operational Insights
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Observations across the current recruitment cycle.
                </p>
              </div>

              <ul className="space-y-3">
                {operationalInsights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Analytics Direction
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This page should later connect to real admin analytics endpoints and charts.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox
                title="Recommended backend data"
                description="Vacancy counts, stage distribution, shortlist counts, verification backlog, and result readiness."
              />
              <InfoBox
                title="Useful future chart"
                description="Applications by vacancy, stage funnel chart, and weekly submission trend using Recharts."
              />
              <InfoBox
                title="Best admin purpose"
                description="Help admin detect bottlenecks, underperforming vacancies, and pending publication decisions."
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/70 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {value}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}

function FunnelCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

function SignalItem({ text }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-gray-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-gray-200">
      {text}
    </div>
  );
}

function InfoBox({ title, description }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

export default AdminAnalytics;