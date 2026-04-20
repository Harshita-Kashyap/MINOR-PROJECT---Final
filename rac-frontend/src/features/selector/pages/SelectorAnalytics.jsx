import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import useTheme from "../../../shared/hooks/useTheme";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { getSelectorCandidates } from "../services/selectorService";

export default function SelectorAnalytics() {
  const { dark } = useTheme();
  const candidates = getSelectorCandidates();

  const data = candidates.map((c) => ({
    name: c.name,
    profile: c.profileScore || 0,
    technical: c.technical || 0,
    personality: c.personality || 0,
  }));

  const rankedData = [...candidates]
    .map((c) => ({
      ...c,
      total: c.overallScore || 0,
    }))
    .sort((a, b) => b.total - a.total);

  const axisColor = dark ? "#9ca3af" : "#6b7280";
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)";
  const tooltipBg = dark ? "#111827" : "#ffffff";
  const tooltipBorder = dark ? "#374151" : "#e5e7eb";
  const tooltipText = dark ? "#f3f4f6" : "#111827";

  const averageProfileScore = Math.round(
    candidates.reduce((sum, c) => sum + (c.profileScore || 0), 0) /
    (candidates.length || 1)
  );

  const averageTechnicalScore = Math.round(
    candidates.reduce((sum, c) => sum + (c.technical || 0), 0) /
    (candidates.length || 1)
  );

  const averageVerificationScore = Math.round(
    candidates.reduce((sum, c) => sum + (c.verificationScore || 0), 0) /
    (candidates.length || 1)
  );

  const finalReviewCount = candidates.filter(
    (c) => c.currentStage === "FINAL_REVIEW"
  ).length;

  const verifiedEligibleCount = candidates.filter(
    (c) => c.verificationStatus === "ELIGIBLE"
  ).length;

  const reviewCount = candidates.filter(
    (c) => c.verificationStatus === "REVIEW"
  ).length;

  const rejectedCount = candidates.filter(
    (c) => c.verificationStatus === "REJECTED"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Selector Workflow Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review verification quality, candidate performance, and final decision readiness.
            </p>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Candidates"
              value={candidates.length}
              accent="blue"
            />
            <MetricCard
              title="Avg Profile Score"
              value={averageProfileScore}
              accent="purple"
            />
            <MetricCard
              title="Avg Technical Score"
              value={averageTechnicalScore}
              accent="green"
            />
            <MetricCard
              title="Final Review Pool"
              value={finalReviewCount}
              accent="amber"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <div className="mb-5 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Candidate Score Overview
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Profile, technical, and personality performance snapshots.
              </p>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: axisColor }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{
                      fill: dark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(17,24,39,0.04)",
                    }}
                    contentStyle={{
                      borderRadius: "14px",
                      border: `1px solid ${tooltipBorder}`,
                      backgroundColor: tooltipBg,
                      color: tooltipText,
                      boxShadow: dark
                        ? "0 10px 25px rgba(0,0,0,0.35)"
                        : "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{ color: tooltipText, fontWeight: 600 }}
                    itemStyle={{ color: tooltipText }}
                  />
                  <Legend
                    iconType="square"
                    wrapperStyle={{
                      color: axisColor,
                      fontSize: "13px",
                      paddingTop: "10px",
                    }}
                  />

                  <Bar
                    dataKey="profile"
                    name="Profile"
                    fill="#8b5cf6"
                    radius={[8, 8, 0, 0]}
                  >
                    {data.map((_, index) => (
                      <Cell key={`profile-${index}`} fill="#8b5cf6" />
                    ))}
                  </Bar>

                  <Bar
                    dataKey="technical"
                    name="Technical"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  >
                    {data.map((_, index) => (
                      <Cell key={`technical-${index}`} fill="#3b82f6" />
                    ))}
                  </Bar>

                  <Bar
                    dataKey="personality"
                    name="Personality"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                  >
                    {data.map((_, index) => (
                      <Cell key={`personality-${index}`} fill="#10b981" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Candidate Comparison
                </h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Ranked by overall score
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                    <tr>
                      <th className="p-3 text-left">Rank</th>
                      <th className="p-3 text-left">Candidate</th>
                      <th className="p-3 text-left">Profile</th>
                      <th className="p-3 text-left">Technical</th>
                      <th className="p-3 text-left">Personality</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Stage</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rankedData.map((c, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-100 transition dark:border-gray-700 ${index === 0
                            ? "bg-green-50/80 dark:bg-green-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                          }`}
                      >
                        <td className="p-3 font-semibold text-gray-800 dark:text-white">
                          {index === 0
                            ? "🥇"
                            : index === 1
                              ? "🥈"
                              : index === 2
                                ? "🥉"
                                : index + 1}
                        </td>

                        <td className="p-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                              {c.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {c.vacancy}
                            </span>
                          </div>
                        </td>

                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {c.profileScore}
                        </td>

                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {c.technical || "-"}
                        </td>

                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {c.personality || "-"}
                        </td>

                        <td className="p-3">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {c.total}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className={getStageColor(c.currentStage)}>
                            {c.currentStage.replaceAll("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
              <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                Verification Insights
              </h2>

              <div className="space-y-3">
                <InsightCard
                  label="Verified Eligible"
                  value={verifiedEligibleCount}
                  accent="green"
                />
                <InsightCard
                  label="Under Review"
                  value={reviewCount}
                  accent="blue"
                />
                <InsightCard
                  label="Rejected at Verification"
                  value={rejectedCount}
                  accent="red"
                />
                <InsightCard
                  label="Avg Verification Score"
                  value={`${averageVerificationScore}%`}
                  accent="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, accent = "blue" }) {
  const accentStyles = {
    blue: "from-blue-500/10 to-blue-100 dark:from-blue-500/10 dark:to-blue-900/20",
    purple:
      "from-purple-500/10 to-purple-100 dark:from-purple-500/10 dark:to-purple-900/20",
    green:
      "from-green-500/10 to-green-100 dark:from-green-500/10 dark:to-green-900/20",
    amber:
      "from-yellow-500/10 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-900/20",
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-gradient-to-br p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:shadow-gray-950/30 ${accentStyles[accent]}`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
        {value}
      </h2>
    </div>
  );
}

function InsightCard({ label, value, accent = "blue" }) {
  const accentMap = {
    green:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    red: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${accentMap[accent]}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function getStageColor(stage) {
  switch (stage) {
    case "FINAL_REVIEW":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "VERIFICATION_REVIEW":
      return "inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "VERIFICATION_REJECTED":
      return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
    case "TECHNICAL_TEST_ASSIGNED":
      return "inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
}