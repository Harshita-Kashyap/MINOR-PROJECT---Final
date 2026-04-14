import Header from "../components/landing/Header";
import SelectorRibbon from "../components/selector/SelectorRibbon";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Aditi Sharma", tech: 78, interview: 70, gate: 650 },
  { name: "Rahul Verma", tech: 82, interview: 75, gate: 720 },
  { name: "Neha Singh", tech: 65, interview: 68, gate: 600 },
];

const SelectorAnalytics = () => {
  return (
    <>
      <Header />
      <SelectorRibbon />

      <div className="p-6 bg-gray-50 min-h-screen space-y-6">

        {/* 🔷 TITLE */}
        <div>
          <h1 className="text-3xl font-bold">Recruitment Analytics</h1>
          <p className="text-gray-500">
            Insights into candidate performance and selection trends
          </p>
        </div>

        {/* 🔷 METRICS */}
        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Candidates" value="25" />
          <Card title="Avg GATE Score" value="650" />
          <Card title="Avg Technical Score" value="75" />
          <Card title="Selection Rate" value="60%" />
        </div>

        {/* 🔷 CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Performance Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tech" />
              <Bar dataKey="interview" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 CANDIDATE COMPARISON (FIXED) */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4 text-lg">
            Candidate Comparison
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Candidate</th>
                <th className="p-2 text-left">GATE</th>
                <th className="p-2 text-left">Technical</th>
                <th className="p-2 text-left">Interview</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {data
                .map((c) => ({
                  ...c,
                  total: c.tech + c.interview,
                }))
                .sort((a, b) => b.total - a.total)
                .map((c, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index === 0 ? "bg-green-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-2 font-semibold">
                      {index === 0 ? "🥇" : index + 1}
                    </td>

                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.gate}</td>
                    <td className="p-2">{c.tech}</td>
                    <td className="p-2">{c.interview}</td>

                    <td className="p-2 font-bold text-blue-600">
                      {c.total}
                    </td>

                    <td className="p-2">
                      <span className={getStatusColor(c.total)}>
                        {getStatusLabel(c.total)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* 🔷 TOP PERFORMERS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Top Performers</h2>

          {data
            .map((c) => ({
              ...c,
              total: c.tech + c.interview,
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 3)
            .map((c, i) => (
              <p key={i}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {c.name} -{" "}
                {c.total}
              </p>
            ))}
        </div>

        {/* 🔷 VERIFICATION INSIGHTS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">
            Verification Insights
          </h2>

          <p>Verified Candidates: 20</p>
          <p>Risk Candidates: 3</p>
          <p>Average Verification Score: 82%</p>
        </div>

      </div>
    </>
  );
};

export default SelectorAnalytics;



/* 🔹 CARD */
const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);


/* 🔹 STATUS LOGIC */
const getStatusLabel = (total) => {
  if (total > 150) return "Recommended";
  if (total > 120) return "Under Review";
  return "Not Recommended";
};

const getStatusColor = (total) => {
  if (total > 150) return "text-green-600 font-semibold";
  if (total > 120) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};