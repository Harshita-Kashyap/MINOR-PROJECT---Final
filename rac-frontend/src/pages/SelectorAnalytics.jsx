import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";
import { useTheme } from "../hooks/useTheme";

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

const data = [
  { name: "Aditi Sharma", tech: 78, interview: 70, gate: 650 },
  { name: "Rahul Verma", tech: 82, interview: 75, gate: 720 },
  { name: "Neha Singh", tech: 65, interview: 68, gate: 600 },
];

const rankedData = [...data]
  .map((c) => ({
    ...c,
    total: c.tech + c.interview,
  }))
  .sort((a, b) => b.total - a.total);

const SelectorAnalytics = () => {
  const { dark } = useTheme();

  const axisColor = dark ? "#9ca3af" : "#6b7280";
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)";
  const tooltipBg = dark ? "#111827" : "#ffffff";
  const tooltipBorder = dark ? "#374151" : "#e5e7eb";
  const tooltipText = dark ? "#f3f4f6" : "#111827";

  const techBarColors = ["#3b82f6", "#3b82f6", "#3b82f6"];
  const interviewBarColors = ["#10b981", "#10b981", "#10b981"];

  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Recruitment Analytics
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Insights into candidate performance and selection trends
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card title="Total Candidates" value="25" accent="blue" />
          <Card title="Avg GATE Score" value="650" accent="purple" />
          <Card title="Avg Technical Score" value="75" accent="green" />
          <Card title="Selection Rate" value="60%" accent="amber" />
        </div>

        {/* CHART */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
          <div className="mb-5 flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Performance Overview
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Technical and interview scores of shortlisted candidates
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
                  wrapperStyle={{
                    color: axisColor,
                    fontSize: "13px",
                    paddingTop: "10px",
                  }}
                />

                <Bar dataKey="tech" name="Technical" radius={[8, 8, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={`tech-${index}`} fill={techBarColors[index]} />
                  ))}
                </Bar>

                <Bar
                  dataKey="interview"
                  name="Interview"
                  radius={[8, 8, 0, 0]}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`interview-${index}`}
                      fill={interviewBarColors[index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPARISON + TOP PERFORMERS */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* CANDIDATE COMPARISON */}
          <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Candidate Comparison
              </h2>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                Ranked by total score
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                  <tr>
                    <th className="p-3 text-left">Rank</th>
                    <th className="p-3 text-left">Candidate</th>
                    <th className="p-3 text-left">GATE</th>
                    <th className="p-3 text-left">Technical</th>
                    <th className="p-3 text-left">Interview</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rankedData.map((c, index) => (
                    <tr
                      key={index}
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
                            {c.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Candidate profile
                          </span>
                        </div>
                      </td>

                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {c.gate}
                      </td>

                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {c.tech}
                      </td>

                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {c.interview}
                      </td>

                      <td className="p-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {c.total}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className={getStatusColor(c.total)}>
                          {getStatusLabel(c.total)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOP PERFORMERS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Top Performers
            </h2>

            <div className="space-y-3">
              {rankedData.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:shadow-sm dark:border-gray-700 dark:bg-gray-700/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                    </span>

                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        GATE: {c.gate} • Tech: {c.tech} • Interview:{" "}
                        {c.interview}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {c.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VERIFICATION INSIGHTS */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/30">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Verification Insights
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InsightCard
              label="Verified Candidates"
              value="20"
              accent="green"
            />
            <InsightCard label="Risk Candidates" value="3" accent="red" />
            <InsightCard
              label="Average Verification Score"
              value="82%"
              accent="blue"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectorAnalytics;

/* CARD */
const Card = ({ title, value, accent = "blue" }) => {
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
};

/* INSIGHT CARD */
const InsightCard = ({ label, value, accent = "blue" }) => {
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
};

/* STATUS LOGIC */
const getStatusLabel = (total) => {
  if (total > 150) return "Recommended";
  if (total > 120) return "Under Review";
  return "Not Recommended";
};

const getStatusColor = (total) => {
  if (total > 150) {
    return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
  }
  if (total > 120) {
    return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  }
  return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
};