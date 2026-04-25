import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import { getAdminAnalytics } from "../services/vacancyService";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    activeVacancies: 0,
    totalVacancies: 0,
    totalApplications: 0,

    verificationPending: 0,
    verificationReview: 0,
    verificationEligible: 0,
    verificationRejected: 0,

    technicalAssigned: 0,
    shortlisted: 0,
    technicalRejected: 0,

    finalReviewPending: 0,
    selected: 0,
    waitlisted: 0,
    finalRejected: 0,

    selectionRate: 0,
    shortlistedRate: 0,
    applicationsPerDay: 0,

    funnel: {},
    vacancyWiseApplications: [],
    weeklyApplications: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAdminAnalytics();
        const data = res.data?.analytics || {};

        setAnalytics({
          activeVacancies: data.activeVacancies || 0,
          totalVacancies: data.totalVacancies || 0,
          totalApplications: data.totalApplications || 0,

          verificationPending: data.verificationPending || 0,
          verificationReview: data.verificationReview || 0,
          verificationEligible: data.verificationEligible || 0,
          verificationRejected: data.verificationRejected || 0,

          technicalAssigned: data.technicalAssigned || 0,
          shortlisted: data.shortlisted || 0,
          technicalRejected: data.technicalRejected || 0,

          finalReviewPending: data.finalReviewPending || 0,
          selected: data.selected || 0,
          waitlisted: data.waitlisted || 0,
          finalRejected: data.finalRejected || 0,

          selectionRate: data.selectionRate || 0,
          shortlistedRate: data.shortlistedRate || 0,
          applicationsPerDay: data.applicationsPerDay || 0,

          funnel: data.funnel || {},
          vacancyWiseApplications: data.vacancyWiseApplications || [],
          weeklyApplications: data.weeklyApplications || [],
        });
      } catch (error) {
        console.error("Admin analytics fetch error:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const funnelData = useMemo(
    () => [
      { label: "Applied", value: analytics.funnel?.applied || 0 },
      { label: "Verification Pending", value: analytics.funnel?.verificationPending || 0 },
      { label: "Verification Review", value: analytics.funnel?.verificationReview || 0 },
      { label: "Eligible", value: analytics.funnel?.verificationEligible || 0 },
      { label: "Technical Assigned", value: analytics.funnel?.technicalAssigned || 0 },
      { label: "Shortlisted", value: analytics.funnel?.shortlisted || 0 },
      { label: "Final Review", value: analytics.funnel?.finalReviewPending || 0 },
      { label: "Selected", value: analytics.funnel?.selected || 0 },
      { label: "Rejected", value: analytics.funnel?.rejected || 0 },
    ],
    [analytics]
  );

  const vacancyInsights = useMemo(() => {
    const insights = [];

    if (analytics.activeVacancies === 0) {
      insights.push("No active vacancies are currently open for applicants.");
    } else {
      insights.push(`${analytics.activeVacancies} vacancies are currently open for applications.`);
    }

    if (analytics.totalApplications === 0) {
      insights.push("No applications have been submitted yet.");
    } else {
      insights.push(`${analytics.totalApplications} total applications have been received across all vacancies.`);
    }

    if (analytics.applicationsPerDay > 0) {
      insights.push(`Around ${analytics.applicationsPerDay} applications are being received per day recently.`);
    } else {
      insights.push("Recent application activity is currently low.");
    }

    return insights;
  }, [analytics]);

  const operationalInsights = useMemo(() => {
    const insights = [];

    if (analytics.verificationReview > 0) {
      insights.push(`${analytics.verificationReview} applications need verification attention.`);
    } else {
      insights.push("No applications are currently pending verification review.");
    }

    if (analytics.finalReviewPending > 0) {
      insights.push(`${analytics.finalReviewPending} candidates are waiting for final review closure.`);
    } else {
      insights.push("No candidates are currently pending final review.");
    }

    if (analytics.selectionRate > 0) {
      insights.push(`Current selection rate is ${analytics.selectionRate}%, based on selected candidates vs total applications.`);
    } else {
      insights.push("Selection rate is 0% because no candidates have been selected yet.");
    }

    return insights;
  }, [analytics]);

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
              title="Total Vacancies"
              value={analytics.totalVacancies}
              description="All vacancies created in the system."
              tone="info"
            />
            <MetricCard
              title="Shortlisting Rate"
              value={`${analytics.shortlistedRate}%`}
              description="Candidates shortlisted compared to total applications."
              tone="success"
            />
            <MetricCard
              title="Selection Rate"
              value={`${analytics.selectionRate}%`}
              description="Final selected candidates compared to total applications."
              tone="warning"
            />
            <MetricCard
              title="Applications / Day"
              value={analytics.applicationsPerDay}
              description="Average recent application inflow."
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
                Vacancy-wise Performance
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Compare application volume, shortlisting, and selection across vacancies.
              </p>
            </div>

            {analytics.vacancyWiseApplications.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No vacancy-wise application data available yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Vacancy</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Applications</th>
                      <th className="p-4">Shortlisted</th>
                      <th className="p-4">Selected</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {analytics.vacancyWiseApplications.map((item) => (
                      <tr key={item.vacancyId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {item.title}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {item.department || "-"}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {item.status}
                        </td>
                        <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                          {item.totalApplications}
                        </td>
                        <td className="p-4 font-semibold text-amber-600 dark:text-amber-400">
                          {item.shortlisted}
                        </td>
                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">
                          {item.selected}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                System Health & Recommendations
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Real-time system observations based on current recruitment data.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox
                title="Verification Load"
                description={
                  analytics.verificationReview > 0
                    ? `${analytics.verificationReview} applications need verification. Consider clearing backlog.`
                    : "No verification backlog currently."
                }
              />

              <InfoBox
                title="Final Decision Stage"
                description={
                  analytics.finalReviewPending > 0
                    ? `${analytics.finalReviewPending} candidates are waiting for final decisions.`
                    : "All final decisions are up to date."
                }
              />

              <InfoBox
                title="System Efficiency"
                description={
                  analytics.selectionRate > 0
                    ? `Current selection rate is ${analytics.selectionRate}%.`
                    : "No selections made yet — system is still in early stage."
                }
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
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/70 ${toneMap[tone || "default"]
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