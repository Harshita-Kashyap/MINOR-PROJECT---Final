import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import useTheme from "../../../shared/hooks/useTheme";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { getSelectorCandidates } from "../services/selectorService";
import {
  formatStage,
  getCandidateName,
  getCompositeScore,
  getVacancyTitle,
} from "../utils/selectorHelpers";

export default function SelectorAnalytics() {
  const { dark } = useTheme();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getSelectorCandidates();
        setCandidates(Array.isArray(res.candidates) ? res.candidates : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const analytics = useMemo(() => {
    const total = candidates.length || 1;

    const data = candidates.map((c) => ({
      name: getCandidateName(c),
      verification: c.verificationScore || 0,
      technical: c.technicalScore || 0,
      personality: c.personalityScore || 0,
      overall: c.overallScore || getCompositeScore(c),
    }));

    const rankedData = [...candidates]
      .map((c) => ({
        ...c,
        total: c.overallScore || getCompositeScore(c),
      }))
      .sort((a, b) => b.total - a.total);

    return {
      data,
      rankedData,
      averageVerificationScore: Math.round(
        candidates.reduce((sum, c) => sum + (c.verificationScore || 0), 0) / total
      ),
      averageTechnicalScore: Math.round(
        candidates.reduce((sum, c) => sum + (c.technicalScore || 0), 0) / total
      ),
      averagePersonalityScore: Math.round(
        candidates.reduce((sum, c) => sum + (c.personalityScore || 0), 0) / total
      ),
      finalReviewCount: candidates.filter((c) => c.currentStage === "FINAL_REVIEW").length,
      completedCount: candidates.filter((c) => c.currentStage === "COMPLETED").length,
      verifiedEligibleCount: candidates.filter((c) => c.verificationStatus === "ELIGIBLE").length,
      reviewCount: candidates.filter((c) => c.verificationStatus === "REVIEW").length,
      pendingCount: candidates.filter((c) => c.verificationStatus === "PENDING").length,
      rejectedCount: candidates.filter((c) => c.verificationStatus === "REJECTED").length,
    };
  }, [candidates]);

  const axisColor = dark ? "#9ca3af" : "#6b7280";
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)";
  const tooltipBg = dark ? "#111827" : "#ffffff";
  const tooltipBorder = dark ? "#374151" : "#e5e7eb";
  const tooltipText = dark ? "#f3f4f6" : "#111827";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                Selector Analytics
              </p>

              <h1 className="text-2xl font-semibold sm:text-3xl">
                Workflow performance and decision readiness
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
                Review backend-driven candidate scores, verification outcomes,
                stage movement, and final review readiness.
              </p>
            </div>
          </section>

          {loading ? (
            <Panel>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading analytics...
              </p>
            </Panel>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  title="Total Candidates"
                  value={candidates.length}
                  note="Applications in selector view"
                  accent="blue"
                />
                <MetricCard
                  title="Avg Verification"
                  value={`${analytics.averageVerificationScore}%`}
                  note="Profile verification score"
                  accent="purple"
                />
                <MetricCard
                  title="Avg Technical"
                  value={analytics.averageTechnicalScore}
                  note="Technical score average"
                  accent="green"
                />
                <MetricCard
                  title="Final Review Pool"
                  value={analytics.finalReviewCount}
                  note="Ready or near decision"
                  accent="amber"
                />
              </div>

              <Panel>
                <SectionHeader
                  title="Candidate Score Overview"
                  subtitle="Verification, technical, personality, and overall score comparison."
                />

                <div className="relative h-[340px] min-h-[340px] w-full min-w-0 overflow-hidden">
                  {analytics.data.length > 0 ? (
                    <ResponsiveContainer width="99%" height={340}>
                      <BarChart data={analytics.data} barCategoryGap="18%">
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

                        <Bar dataKey="verification" name="Verification" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="technical" name="Technical" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="personality" name="Personality" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="overall" name="Overall" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="No analytics data available yet." />
                  )}
                </div>
              </Panel>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Panel className="xl:col-span-2">
                  <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Candidate Ranking
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ranked by overall score from backend values.
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      Highest score first
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[820px] text-sm">
                      <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                        <tr>
                          <th className="p-3 text-left">Rank</th>
                          <th className="p-3 text-left">Candidate</th>
                          <th className="p-3 text-left">Verification</th>
                          <th className="p-3 text-left">Technical</th>
                          <th className="p-3 text-left">Personality</th>
                          <th className="p-3 text-left">Overall</th>
                          <th className="p-3 text-left">Stage</th>
                        </tr>
                      </thead>

                      <tbody>
                        {analytics.rankedData.length > 0 ? (
                          analytics.rankedData.map((c, index) => (
                            <tr
                              key={c._id || c.cid || `candidate-${index}`}
                              className={`border-b border-gray-100 transition dark:border-gray-700 ${
                                index === 0
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
                                    {getCandidateName(c)}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {getVacancyTitle(c)}
                                  </span>
                                </div>
                              </td>

                              <td className="p-3 text-gray-700 dark:text-gray-300">
                                {c.verificationScore || 0}%
                              </td>

                              <td className="p-3 text-gray-700 dark:text-gray-300">
                                {c.technicalScore ?? "-"}
                              </td>

                              <td className="p-3 text-gray-700 dark:text-gray-300">
                                {c.personalityScore ?? "-"}
                              </td>

                              <td className="p-3">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                  {c.total}
                                </span>
                              </td>

                              <td className="p-3">
                                <span className={getStageColor(c.currentStage)}>
                                  {formatStage(c.currentStage)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="p-8 text-center text-sm text-gray-500 dark:text-gray-400"
                            >
                              No candidates available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <Panel>
                  <SectionHeader
                    title="Verification Insights"
                    subtitle="Verification outcomes from backend records."
                  />

                  <div className="space-y-3">
                    <InsightCard
                      label="Verified Eligible"
                      value={analytics.verifiedEligibleCount}
                      accent="green"
                    />
                    <InsightCard
                      label="Under Review"
                      value={analytics.reviewCount}
                      accent="blue"
                    />
                    <InsightCard
                      label="Pending"
                      value={analytics.pendingCount}
                      accent="amber"
                    />
                    <InsightCard
                      label="Rejected"
                      value={analytics.rejectedCount}
                      accent="red"
                    />
                    <InsightCard
                      label="Avg Verification Score"
                      value={`${analytics.averageVerificationScore}%`}
                      accent="blue"
                    />
                    <InsightCard
                      label="Completed Decisions"
                      value={analytics.completedCount}
                      accent="green"
                    />
                  </div>
                </Panel>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5 flex flex-col gap-1">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      {message}
    </div>
  );
}

function MetricCard({ title, value, note, accent = "blue" }) {
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
      className={`rounded-2xl border border-gray-200 bg-gradient-to-br p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:shadow-gray-950/30 ${
        accentStyles[accent]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
        {value ?? 0}
      </h2>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {note}
      </p>
    </div>
  );
}

function InsightCard({ label, value, accent = "blue" }) {
  const accentMap = {
    green:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    red: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    amber:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            accentMap[accent]
          }`}
        >
          {value ?? 0}
        </span>
      </div>
    </div>
  );
}

function getStageColor(stage) {
  switch (stage) {
    case "FINAL_REVIEW":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "VERIFICATION":
      return "inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "TECHNICAL":
      return "inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";
    case "PERSONALITY":
      return "inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    case "COMPLETED":
      return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
}