import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidates } from "../services/selectorService";

export default function SelectorCandidates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");

  const applications = getSelectorCandidates();

  const vacancies = ["All", ...new Set(applications.map((item) => item.vacancy))];
  const stages = [
    "All",
    "VERIFICATION_REVIEW",
    "VERIFICATION_REJECTED",
    "TECHNICAL_TEST_ASSIGNED",
    "PERSONALITY_TEST_ASSIGNED",
    "FINAL_REVIEW",
  ];

  const filtered = useMemo(() => {
    return applications.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.cid.toLowerCase().includes(search.toLowerCase());

      const matchesVacancy =
        vacancyFilter === "All" || c.vacancy === vacancyFilter;

      const matchesStage =
        stageFilter === "All" || c.currentStage === stageFilter;

      return matchesSearch && matchesVacancy && matchesStage;
    });
  }, [applications, search, vacancyFilter, stageFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Candidate Evaluation Queue
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review applicants by vacancy, current stage, verification outcome, and decision readiness.
            </p>
          </section>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="text"
                placeholder="Search candidate or application ID"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={vacancyFilter}
                onChange={(e) => setVacancyFilter(e.target.value)}
              >
                {vacancies.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage === "All" ? "All Stages" : stage.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card className="overflow-hidden border border-gray-200/80 p-0 shadow-sm dark:border-gray-700/80">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead className="bg-gray-50 dark:bg-gray-800/80">
                  <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
                    <th className="px-4 py-4">Application ID</th>
                    <th className="px-4 py-4">Candidate</th>
                    <th className="px-4 py-4">Vacancy</th>
                    <th className="px-4 py-4">Current Stage</th>
                    <th className="px-4 py-4">Verification</th>
                    <th className="px-4 py-4">Technical</th>
                    <th className="px-4 py-4">Personality</th>
                    <th className="px-4 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((c) => (
                      <tr
                        key={c.id}
                        className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {c.cid}
                        </td>

                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {c.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {c.email}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {c.vacancy}
                        </td>

                        <td className="px-4 py-4">
                          <Badge variant="info">
                            {c.currentStage.replaceAll("_", " ")}
                          </Badge>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-1 text-sm">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {c.verificationStatus}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                              {c.verificationScore}%
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {c.technical || "-"}
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {c.personality || "-"}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/selector/candidate/${c.id}`)}
                            >
                              View
                            </Button>

                            <Button
                              size="sm"
                              onClick={() => navigate(`/selector/evaluation/${c.id}`)}
                            >
                              Evaluate
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No candidates found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}