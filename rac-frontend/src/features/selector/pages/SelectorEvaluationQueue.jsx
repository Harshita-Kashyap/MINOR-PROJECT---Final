import { useEffect, useMemo, useState } from "react";
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
        console.error(err);
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
          (candidate.cid || candidate.applicationId || "")
            .toLowerCase()
            .includes(searchText);

        return isReadyForEvaluation(candidate) && matchesSearch;
      })
      .sort((a, b) => getCompositeScore(b) - getCompositeScore(a));
  }, [applications, search]);

  const completedCount = applications.filter(
    (c) => c.currentStage === "COMPLETED"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Evaluation Queue
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Candidates who reached final review and need selector decision.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/selector/candidates")}
            >
              View Candidate Directory
            </Button>
          </section>

          <div className="grid gap-4 sm:grid-cols-3">
            <QueueMetric title="Ready for Decision" value={evaluationQueue.length} />
            <QueueMetric title="Total Candidates" value={applications.length} />
            <QueueMetric title="Completed" value={completedCount} />
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <input
              type="text"
              placeholder="Search candidate or application ID"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Card>

          {loading ? (
            <Card>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading evaluation queue...
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {evaluationQueue.length > 0 ? (
                evaluationQueue.map((candidate, index) => (
                  <Card
                    key={candidate._id || candidate.cid || `eval-${index}`}
                    className="border border-gray-200/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={getStageBadgeVariant(candidate.currentStage)}>
                            {formatStage(candidate.currentStage)}
                          </Badge>
                          <Badge variant="info">
                            Score: {getCompositeScore(candidate)}
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

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <MiniScore
                            label="Verification"
                            value={`${candidate.verificationScore || 0}%`}
                          />
                          <MiniScore
                            label="Technical"
                            value={candidate.technicalScore ?? "-"}
                          />
                          <MiniScore
                            label="Personality"
                            value={candidate.personalityScore ?? "-"}
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
                ))
              ) : (
                <Card className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    No candidates ready for final evaluation
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Candidates will appear here after reaching the FINAL REVIEW stage.
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function QueueMetric({ title, value }) {
  return (
    <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value ?? 0}
      </h2>
    </Card>
  );
}

function MiniScore({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}