import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import { getAdminAnalytics } from "../services/adminService";

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
    technicalSubmitted: 0,
    technicalQualified: 0,
    technicalRejected: 0,

    personalityAssigned: 0,
    personalitySubmitted: 0,

    finalReviewPending: 0,
    selected: 0,
    waitlisted: 0,
    finalRejected: 0,

    selectionRate: 0,
    technicalQualificationRate: 0,
    applicationsPerDay: 0,

    funnel: {},
    finalOutcomeSummary: {},
    vacancyWiseApplications: [],
    stageWiseDistribution: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAdminAnalytics();
        const data = res.data?.analytics || {};
        setAnalytics((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Admin analytics fetch error:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const funnelData = useMemo(
    () => [
      ["Applied", analytics.funnel?.applied],
      ["Verification Pending", analytics.funnel?.verificationPending],
      ["Verification Eligible", analytics.funnel?.verificationEligible],
      ["Technical Assigned", analytics.funnel?.technicalAssigned],
      ["Technical Submitted", analytics.funnel?.technicalSubmitted],
      ["Technical Qualified", analytics.funnel?.technicalQualified],
      ["Personality Assigned", analytics.funnel?.personalityAssigned],
      ["Personality Submitted", analytics.funnel?.personalitySubmitted],
      ["Final Review", analytics.funnel?.finalReviewPending],
      ["Selected", analytics.funnel?.selected],
      ["Waitlisted", analytics.funnel?.waitlisted],
      ["Rejected", analytics.funnel?.rejected],
    ],
    [analytics]
  );

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
              Read-only reports for the full RAC-style workflow. Admin monitors; Selector evaluates.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Vacancies" value={analytics.totalVacancies} tone="info" />
            <MetricCard title="Technical Qualification Rate" value={`${analytics.technicalQualificationRate}%`} tone="success" />
            <MetricCard title="Selection Rate" value={`${analytics.selectionRate}%`} tone="warning" />
            <MetricCard title="Applications / Day" value={analytics.applicationsPerDay} tone="danger" />
          </section>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Workflow Funnel
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3 xl:grid-cols-4">
              {funnelData.map(([label, value]) => (
                <FunnelCard key={label} label={label} value={value || 0} />
              ))}
            </div>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Final Outcome Summary
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <FunnelCard label="Selected" value={analytics.finalOutcomeSummary?.selected || 0} />
                <FunnelCard label="Waitlisted" value={analytics.finalOutcomeSummary?.waitlisted || 0} />
                <FunnelCard label="Rejected" value={analytics.finalOutcomeSummary?.rejected || 0} />
                <FunnelCard label="Not Decided" value={analytics.finalOutcomeSummary?.notDecided || 0} />
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Stage-wise Distribution
              </h2>

              <div className="mt-5 space-y-3">
                {analytics.stageWiseDistribution.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No stage distribution data available.
                  </p>
                ) : (
                  analytics.stageWiseDistribution.map((item) => (
                    <div
                      key={item.stage}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/60"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.stage}
                      </span>
                      <strong className="text-gray-900 dark:text-gray-100">
                        {item.count}
                      </strong>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Vacancy-wise Performance
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Shows vacancy-wise application volume and score averages. Vacancies with no applications may show zero values.
            </p>

            {analytics.vacancyWiseApplications.length === 0 ? (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-8 text-center dark:border-gray-700 dark:bg-gray-800/60">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  No vacancy-wise performance data available yet.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Data will appear after applicants submit applications.
                </p>
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Vacancy</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Applications</th>
                      <th className="p-4">Technical Qualified</th>
                      <th className="p-4">Selected</th>
                      <th className="p-4">Waitlisted</th>
                      <th className="p-4">Avg Technical</th>
                      <th className="p-4">Avg Personality</th>
                      <th className="p-4">Avg Overall</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {analytics.vacancyWiseApplications.map((item) => (
                      <tr
                        key={item.vacancyId || item.title}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {item.title || "-"}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {item.department || "-"}
                        </td>
                        <td className="p-4">
                          <StatusPill status={item.status} />
                        </td>
                        <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                          {item.totalApplications || 0}
                        </td>
                        <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                          {item.technicalQualified || 0}
                        </td>
                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">
                          {item.selected || 0}
                        </td>
                        <td className="p-4 font-semibold text-amber-600 dark:text-amber-400">
                          {item.waitlisted || 0}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {formatScore(item.avgTechnicalScore)}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {formatScore(item.avgPersonalityScore)}
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {formatScore(item.avgOverallScore)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-gray-800",
  };

  return (
    <Card className={`bg-gradient-to-br ${toneMap[tone]}`}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
    </Card>
  );
}

function FunnelCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800/60">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

function formatScore(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return Number(value).toFixed(1);
}

function StatusPill({ status }) {
  const map = {
    OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    CLOSED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    DRAFT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        map[status] ||
        "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300"
      }`}
    >
      {status || "-"}
    </span>
  );
}

export default AdminAnalytics;