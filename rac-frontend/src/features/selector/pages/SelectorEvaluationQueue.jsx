import { useEffect, useMemo, useState } from "react";
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
  getCompositeScore,
  getStageBadgeVariant,
  getVacancyTitle,
  isReadyForEvaluation,
} from "../utils/selectorHelpers";

export default function SelectorEvaluationQueue() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const res = await getSelectorCandidates();
        setApplications(Array.isArray(res.candidates) ? res.candidates : []);
      } catch (err) {
        console.error("Evaluation queue error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const evaluationQueue = useMemo(() => {
    const searchText = search.toLowerCase();

    return applications
      .filter((candidate) => {
        const matchesSearch =
          getCandidateName(candidate).toLowerCase().includes(searchText) ||
          getCandidateEmail(candidate).toLowerCase().includes(searchText) ||
          (candidate.cid || candidate.applicationId || "")
            .toLowerCase()
            .includes(searchText) ||
          getVacancyTitle(candidate).toLowerCase().includes(searchText);

        return isReadyForEvaluation(candidate) && matchesSearch;
      })
      .sort((a, b) => getCompositeScore(b) - getCompositeScore(a));
  }, [applications, search]);

  const completedCount = applications.filter((candidate) =>
    [
      SELECTOR_STAGES.SELECTED,
      SELECTOR_STAGES.WAITLISTED,
      SELECTOR_STAGES.FINAL_REJECTED,
    ].includes(normalizeStage(candidate.currentStage, candidate))
  ).length;

  const finalReviewCount = applications.filter(
    (candidate) =>
      normalizeStage(candidate.currentStage, candidate) ===
      SELECTOR_STAGES.FINAL_REVIEW
  ).length;

  const selectedCount = applications.filter(
    (candidate) =>
      normalizeStage(candidate.currentStage, candidate) ===
      SELECTOR_STAGES.SELECTED
  ).length;

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
                  Final Review Queue
                </p>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Selector Evaluation Queue
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Review candidates who have completed assessment stages and are
                  ready for final selector decision.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/candidates")}
                >
                  Candidate Directory
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/selector/schedule-technical-test")}
                >
                  Schedule Tests
                </Button>
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QueueMetric
              title="Ready for Decision"
              value={evaluationQueue.length}
              tone="danger"
              note="Awaiting selector decision"
            />
            <QueueMetric
              title="Final Review Pool"
              value={finalReviewCount}
              tone="info"
              note="Candidates in final review"
            />
            <QueueMetric
              title="Completed Decisions"
              value={completedCount}
              tone="success"
              note="Selected / waitlisted / rejected"
            />
            <QueueMetric
              title="Selected"
              value={selectedCount}
              tone="success"
              note="Final selected candidates"
            />
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Candidates Ready for Final Decision
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Only candidates at final review with pending final status appear here.
                </p>
              </div>

              <div className="w-full md:max-w-sm">
                <input
                  type="text"
                  placeholder="Search name, email, vacancy, or application ID"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {loading ? (
            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading evaluation queue...
              </p>
            </Card>
          ) : evaluationQueue.length > 0 ? (
            <div className="grid gap-4">
              {evaluationQueue.map((candidate, index) => {
                const stage = normalizeStage(candidate.currentStage, candidate);

                return (
                  <Card
                    key={candidate._id || candidate.cid || `eval-${index}`}
                    className="border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={getStageBadgeVariant(stage, candidate)}>
                            {formatStage(stage, candidate)}
                          </Badge>

                          <Badge variant="info">
                            Overall: {candidate.overallScore || getCompositeScore(candidate)}
                          </Badge>

                          <Badge variant="warning">
                            Final: {candidate.finalStatus || "PENDING"}
                          </Badge>
                        </div>

                        <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                          {getCandidateName(candidate)}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {getCandidateEmail(candidate)}
                        </p>

                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          {getVacancyTitle(candidate)}
                        </p>

                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Application ID:{" "}
                          {candidate.cid || candidate.applicationId || "N/A"}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <MiniScore
                            label="Technical"
                            value={candidate.technicalScore ?? "-"}
                          />
                          <MiniScore
                            label="Personality"
                            value={candidate.personalityScore ?? "-"}
                          />
                          <MiniScore
                            label="Overall"
                            value={candidate.overallScore || getCompositeScore(candidate)}
                          />
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                        <Button
                          variant="outline"
                          disabled={!candidate._id}
                          onClick={() =>
                            navigate(`/selector/candidate/${candidate._id}`)
                          }
                        >
                          View Profile
                        </Button>

                        <Button
                          disabled={!candidate._id}
                          onClick={() =>
                            navigate(`/selector/evaluation/${candidate._id}`)
                          }
                        >
                          Evaluate Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border border-gray-200/80 text-center shadow-sm dark:border-gray-700/80">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                No candidates ready for final evaluation
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Candidates will appear here after technical and personality stages
                are completed and the application reaches final review.
              </p>

              <div className="mt-5 flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/selector/candidates")}
                >
                  View Candidates
                </Button>

                <Button
                  onClick={() => navigate("/selector/technical-results")}
                >
                  Go to Technical Results
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function QueueMetric({ title, value, note, tone = "default" }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    success:
      "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-gray-800",
    warning:
      "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 ${toneMap[tone] || toneMap.default
        }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value ?? 0}
      </h2>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {note}
      </p>
    </Card>
  );
}

function MiniScore({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}