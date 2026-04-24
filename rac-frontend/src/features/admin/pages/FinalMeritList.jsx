import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";

function FinalMeritList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeritList = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/merit-list");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching merit list:", error);

      setCandidates([
        {
          id: 1,
          name: "Rahul Sharma",
          email: "rahul@gmail.com",
          vacancy: "Scientist B - Computer Science",
          score: 92,
          finalStatus: "Selected",
        },
        {
          id: 2,
          name: "Priya Verma",
          email: "priya@gmail.com",
          vacancy: "Scientist B - Mechanical",
          score: 88,
          finalStatus: "Waitlisted",
        },
        {
          id: 3,
          name: "Amit Singh",
          email: "amit@gmail.com",
          vacancy: "Scientist B - Electronics",
          score: 84,
          finalStatus: "Selected",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeritList();
  }, []);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => b.score - a.score);
  }, [candidates]);

  const stats = {
    total: sortedCandidates.length,
    selected: sortedCandidates.filter(
      (c) => (c.finalStatus || "").toLowerCase() === "selected"
    ).length,
    waitlisted: sortedCandidates.filter(
      (c) => (c.finalStatus || "").toLowerCase() === "waitlisted"
    ).length,
    averageScore:
      sortedCandidates.length > 0
        ? Math.round(
            sortedCandidates.reduce((sum, c) => sum + (Number(c.score) || 0), 0) /
              sortedCandidates.length
          )
        : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Final Merit List
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Review final ranked candidates, confirm selection status, and prepare results for publishing.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Preview Result</Button>
              <Button>Publish Results</Button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Ranked"
              value={stats.total}
              description="Candidates available in the final merit pool."
              tone="default"
            />
            <MetricCard
              title="Selected"
              value={stats.selected}
              description="Candidates currently marked as selected."
              tone="success"
            />
            <MetricCard
              title="Waitlisted"
              value={stats.waitlisted}
              description="Candidates kept in reserve for final outcome."
              tone="warning"
            />
            <MetricCard
              title="Average Score"
              value={stats.averageScore}
              description="Average final score across the merit list."
              tone="info"
            />
          </section>

          <Card className="border border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox
                title="Result workflow"
                description="This page should be the final administrative checkpoint before publishing official outcomes."
              />
              <InfoBox
                title="Selector alignment"
                description="Merit ranking should stay consistent with selector recommendations and final stage decisions."
              />
              <InfoBox
                title="Publishing control"
                description="Use this page to review rank order, selected pool, and waitlist before publication."
              />
            </div>
          </Card>

          <Card className="overflow-hidden border border-gray-200/80 bg-white/95 p-0 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            {loading ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                Loading merit list...
              </div>
            ) : sortedCandidates.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No candidates are available in the final merit list yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead className="bg-gray-100/90 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Rank</th>
                      <th className="p-4 font-semibold">Candidate</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Vacancy</th>
                      <th className="p-4 font-semibold">Final Score</th>
                      <th className="p-4 font-semibold">Result Status</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedCandidates.map((candidate, index) => (
                      <tr
                        key={candidate.id || candidate._id || index}
                        className={`transition hover:bg-gray-50/80 dark:hover:bg-gray-800/70 ${
                          index === 0
                            ? "bg-emerald-50/80 dark:bg-emerald-950/20"
                            : ""
                        }`}
                      >
                        <td className="p-4">
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            #{index + 1}
                          </span>
                        </td>

                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {candidate.name}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {candidate.email}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {candidate.vacancy || "—"}
                        </td>

                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">
                          {candidate.score}
                        </td>

                        <td className="p-4">
                          <StatusPill status={candidate.finalStatus || "Selected"} />
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm">
                              Confirm
                            </Button>
                          </div>
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

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default:
      "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    success:
      "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    warning:
      "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    info:
      "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
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

function StatusPill({ status }) {
  const normalized = status.toLowerCase();

  const style =
    normalized === "selected"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      : normalized === "waitlisted"
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      : "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

export default FinalMeritList;