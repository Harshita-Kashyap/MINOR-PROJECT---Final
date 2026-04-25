import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import {
  getVacancies,
  generateMeritList,
} from "../services/vacancyService";

function FinalMeritList() {
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVacancies = async () => {
    try {
      const res = await getVacancies();
      const data = res.data?.vacancies || [];
      setVacancies(data);

      if (data.length > 0) {
        setSelectedVacancy(data[0]._id);
      }
    } catch (error) {
      console.error("Vacancy fetch error:", error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleGenerateMeritList = async () => {
    if (!selectedVacancy) {
      alert("Please select a vacancy first");
      return;
    }

    try {
      setLoading(true);
      const res = await generateMeritList(selectedVacancy);
      setCandidates(res.data?.meritList || []);
    } catch (error) {
      console.error("Merit list error:", error);
      alert("Failed to generate merit list");
    } finally {
      setLoading(false);
    }
  };

  const selectedVacancyTitle =
    vacancies.find((v) => v._id === selectedVacancy)?.title || "";

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort(
      (a, b) => Number(b.overallScore || 0) - Number(a.overallScore || 0)
    );
  }, [candidates]);

  const stats = {
    total: sortedCandidates.length,
    selected: sortedCandidates.filter((c) => c.finalStatus === "SELECTED").length,
    waitlisted: sortedCandidates.filter((c) => c.finalStatus === "WAITLISTED").length,
    averageScore:
      sortedCandidates.length > 0
        ? Math.round(
            sortedCandidates.reduce(
              (sum, c) => sum + Number(c.overallScore || 0),
              0
            ) / sortedCandidates.length
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
                Generate and review ranked candidates based on final evaluation scores.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleGenerateMeritList}>
                Preview Result
              </Button>
              <Button disabled>
                Publish Results
              </Button>
            </div>
          </section>

          <Card>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={selectedVacancy}
                onChange={(e) => {
                  setSelectedVacancy(e.target.value);
                  setCandidates([]);
                }}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                {vacancies.length === 0 ? (
                  <option value="">No vacancies found</option>
                ) : (
                  vacancies.map((vacancy) => (
                    <option key={vacancy._id} value={vacancy._id}>
                      {vacancy.title}
                    </option>
                  ))
                )}
              </select>

              <Button onClick={handleGenerateMeritList} disabled={loading}>
                {loading ? "Generating..." : "Generate Merit List"}
              </Button>
            </div>
          </Card>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Ranked" value={stats.total} tone="default" />
            <MetricCard title="Selected" value={stats.selected} tone="success" />
            <MetricCard title="Waitlisted" value={stats.waitlisted} tone="warning" />
            <MetricCard title="Average Score" value={stats.averageScore} tone="info" />
          </section>

          <Card>
            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox
                title="Selected Vacancy"
                description={selectedVacancyTitle || "Select a vacancy to generate its merit list."}
              />
              <InfoBox
                title="Ranking Logic"
                description="Candidates are ranked using overall score, then technical score as a tie-breaker."
              />
              <InfoBox
                title="Publishing"
                description="Publishing is disabled for now until we add the backend publish-results route."
              />
            </div>
          </Card>

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                Generating merit list...
              </div>
            ) : sortedCandidates.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No candidates available. Select a vacancy and generate merit list.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Rank</th>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Technical</th>
                      <th className="p-4">Personality</th>
                      <th className="p-4">Overall</th>
                      <th className="p-4">Result</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedCandidates.map((candidate, index) => (
                      <tr
                        key={candidate.applicationId || index}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          index === 0 ? "bg-emerald-50/80 dark:bg-emerald-950/20" : ""
                        }`}
                      >
                        <td className="p-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            #{candidate.rank || index + 1}
                          </span>
                        </td>

                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {candidate.candidateName}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {candidate.email || "-"}
                        </td>

                        <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                          {candidate.technicalScore}
                        </td>

                        <td className="p-4 font-semibold text-purple-600 dark:text-purple-400">
                          {candidate.personalityScore}
                        </td>

                        <td className="p-4 font-semibold text-green-600 dark:text-green-400">
                          {candidate.overallScore}
                        </td>

                        <td className="p-4">
                          <StatusPill status={candidate.finalStatus} />
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
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
  };

  return (
    <Card className={`bg-gradient-to-br ${toneMap[tone || "default"]}`}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
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
  const normalized = String(status || "").toUpperCase();

  const style =
    normalized === "SELECTED"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      : normalized === "WAITLISTED"
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      : normalized === "RECOMMENDED"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      : "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}

export default FinalMeritList;