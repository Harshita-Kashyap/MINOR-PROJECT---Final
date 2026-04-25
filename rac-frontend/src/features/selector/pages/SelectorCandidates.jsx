import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidates } from "../services/selectorService";
import {
  formatStage,
  getCandidateEmail,
  getCandidateName,
  getPersonalityScore,
  getStageBadgeVariant,
  getTechnicalScore,
  getVacancyTitle,
} from "../utils/selectorHelpers";

export default function SelectorCandidates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await getSelectorCandidates();
        setApplications(Array.isArray(res.candidates) ? res.candidates : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidates();
  }, []);

  const vacancies = [
    "All",
    ...new Set(applications.map((item) => getVacancyTitle(item)).filter(Boolean)),
  ];

  const stages = [
    "All",
    "APPLIED",
    "VERIFICATION",
    "TECHNICAL",
    "PERSONALITY",
    "FINAL_REVIEW",
    "COMPLETED",
  ];

  const filtered = useMemo(() => {
    return applications.filter((c) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        getCandidateName(c).toLowerCase().includes(searchText) ||
        (c.cid || c.applicationId || "").toLowerCase().includes(searchText);

      const matchesVacancy =
        vacancyFilter === "All" || getVacancyTitle(c) === vacancyFilter;

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
              Candidate Directory
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View all applicants, inspect profiles, and track recruitment stages.
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
                {vacancies.map((v, index) => (
                  <option key={v || `vacancy-${index}`} value={v}>
                    {v || "Untitled Vacancy"}
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
                    {stage === "All" ? "All Stages" : formatStage(stage)}
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
                    filtered.map((c, index) => (
                      <tr
                        key={c._id || c.cid || `candidate-${index}`}
                        className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {c.cid || c.applicationId || "N/A"}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {getCandidateName(c)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getCandidateEmail(c)}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {getVacancyTitle(c)}
                        </td>

                        <td className="px-4 py-4">
                          <Badge variant={getStageBadgeVariant(c.currentStage)}>
                            {formatStage(c.currentStage)}
                          </Badge>
                        </td>

                        <td className="px-4 py-4 text-sm">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {c.verificationStatus || "N/A"}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {c.verificationScore || 0}%
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {getTechnicalScore(c)}
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {getPersonalityScore(c)}
                        </td>

                        <td className="px-4 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/selector/candidate/${c._id}`)}
                          >
                            View Profile
                          </Button>
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