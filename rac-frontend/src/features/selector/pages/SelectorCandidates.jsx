import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidates } from "../services/selectorService";
import {
  SELECTOR_STAGES,
  normalizeStage,
  formatStage,
  getCandidateEmail,
  getCandidateName,
  getPersonalityScore,
  getStageBadgeVariant,
  getTechnicalScore,
  getVacancyTitle,
  isReadyForEvaluation,
} from "../utils/selectorHelpers";

const STAGE_FILTERS = [
  "All",
  SELECTOR_STAGES.VERIFICATION_ELIGIBLE,
  SELECTOR_STAGES.TECHNICAL_TEST_ASSIGNED,
  SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED,
  SELECTOR_STAGES.TECHNICAL_QUALIFIED,
  SELECTOR_STAGES.TECHNICAL_REJECTED,
  SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED,
  SELECTOR_STAGES.PERSONALITY_TEST_SUBMITTED,
  SELECTOR_STAGES.FINAL_REVIEW,
  SELECTOR_STAGES.SELECTED,
  SELECTOR_STAGES.WAITLISTED,
  SELECTOR_STAGES.FINAL_REJECTED,
  SELECTOR_STAGES.VERIFICATION_REJECTED,
];

export default function SelectorCandidates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await getSelectorCandidates();
        setApplications(Array.isArray(res.candidates) ? res.candidates : []);
      } catch (err) {
        console.error("Candidate directory error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const vacancies = useMemo(
    () => [
      "All",
      ...new Set(applications.map((item) => getVacancyTitle(item)).filter(Boolean)),
    ],
    [applications]
  );

  const summary = useMemo(() => {
    return {
      total: applications.length,
      technicalPending: applications.filter(
        (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.VERIFICATION_ELIGIBLE
      ).length,
      cutoffPending: applications.filter(
        (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED
      ).length,
      finalReview: applications.filter(isReadyForEvaluation).length,
    };
  }, [applications]);

  const filtered = useMemo(() => {
    const searchText = search.toLowerCase();

    return applications.filter((c) => {
      const normalizedStage = normalizeStage(c.currentStage, c);

      const matchesSearch =
        getCandidateName(c).toLowerCase().includes(searchText) ||
        getCandidateEmail(c).toLowerCase().includes(searchText) ||
        getVacancyTitle(c).toLowerCase().includes(searchText) ||
        (c.cid || c.applicationId || "").toLowerCase().includes(searchText);

      const matchesVacancy =
        vacancyFilter === "All" || getVacancyTitle(c) === vacancyFilter;

      const matchesStage =
        stageFilter === "All" || normalizedStage === stageFilter;

      return matchesSearch && matchesVacancy && matchesStage;
    });
  }, [applications, search, vacancyFilter, stageFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                  Candidate Directory
                </p>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  View applicants across the automated recruitment workflow
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Inspect candidates, track stages, review scores, and open individual
                  profiles without manually changing intermediate stages.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/technical-results")}
                >
                  Technical Results
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/selector/evaluation")}
                >
                  Final Evaluation
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MiniMetric title="Total Candidates" value={summary.total} />
            <MiniMetric title="Ready for Technical" value={summary.technicalPending} tone="warning" />
            <MiniMetric title="Cutoff Pending" value={summary.cutoffPending} tone="danger" />
            <MiniMetric title="Final Review" value={summary.finalReview} tone="success" />
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="text"
                placeholder="Search name, email, vacancy, or application ID"
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
                    {v === "All" ? "All Vacancies" : v || "Untitled Vacancy"}
                  </option>
                ))}
              </select>

              <select
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                {STAGE_FILTERS.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage === "All" ? "All Stages" : formatStage(stage)}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          <Card className="overflow-hidden border border-gray-200/80 p-0 shadow-sm dark:border-gray-700/80">
            <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Candidate Records
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Showing {filtered.length} of {applications.length} records.
              </p>
            </div>

            {loading ? (
              <div className="px-4 py-8 text-sm text-gray-500 dark:text-gray-400">
                Loading candidates...
              </div>
            ) : (
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
                      <th className="px-4 py-4">Overall</th>
                      <th className="px-4 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((c, index) => {
                        const stage = normalizeStage(c.currentStage, c);

                        return (
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
                              <Badge variant={getStageBadgeVariant(stage, c)}>
                                {formatStage(stage, c)}
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

                            <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                              {c.overallScore ?? 0}
                            </td>

                            <td className="px-4 py-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/selector/candidate/${c._id}`)}
                                disabled={!c._id}
                              >
                                View Profile
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                        >
                          No candidates found for the selected filters.
                        </td>
                      </tr>
                    )}
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

function MiniMetric({ title, value, tone = "default" }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
    success: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm dark:border-gray-700/80 ${
        toneMap[tone] || toneMap.default
      }`}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value ?? 0}
      </h2>
    </Card>
  );
}