import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  getSelectorDashboard,
  getSelectorCandidates,
} from "../services/selectorService";
import {
  formatStage,
  getCandidateName,
  getStageBadgeVariant,
  getVacancyTitle,
  isReadyForEvaluation,
} from "../utils/selectorHelpers";

export default function SelectorDashboard() {
  const navigate = useNavigate();

  const [dashboardStats, setDashboardStats] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [dashboard, candidateRes] = await Promise.all([
          getSelectorDashboard(),
          getSelectorCandidates(),
        ]);

        setDashboardStats(dashboard.stats || {});
        setCandidates(Array.isArray(candidateRes.candidates) ? candidateRes.candidates : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const derivedStats = useMemo(() => {
    return {
      total: dashboardStats.total ?? candidates.length,

      verificationReview: candidates.filter(
        (c) =>
          c.currentStage === "VERIFICATION" ||
          c.verificationStatus === "REVIEW" ||
          c.verificationStatus === "PENDING"
      ).length,

      verificationRejected: candidates.filter(
        (c) => c.verificationStatus === "REJECTED"
      ).length,

      technical: candidates.filter((c) => c.currentStage === "TECHNICAL").length,

      personality: candidates.filter((c) => c.currentStage === "PERSONALITY").length,

      finalReview:
        dashboardStats.finalReview ??
        candidates.filter((c) => c.currentStage === "FINAL_REVIEW").length,

      completed:
        dashboardStats.completed ??
        candidates.filter((c) => c.currentStage === "COMPLETED").length,

      readyForEvaluation: candidates.filter(isReadyForEvaluation).length,

      recommended: dashboardStats.recommended ?? 0,
      rejected: dashboardStats.rejected ?? 0,
      hold: dashboardStats.hold ?? 0,
      waitlisted: dashboardStats.waitlisted ?? 0,
    };
  }, [dashboardStats, candidates]);

  const stageBuckets = [
    {
      title: "Total Candidates",
      value: derivedStats.total,
      tone: "default",
      description: "All applications available to selector.",
    },
    {
      title: "Verification Review",
      value: derivedStats.verificationReview,
      tone: "warning",
      description: "Profiles pending or needing review.",
    },
    {
      title: "Final Review",
      value: derivedStats.finalReview,
      tone: "info",
      description: "Candidates close to final selector decision.",
    },
    {
      title: "Ready to Evaluate",
      value: derivedStats.readyForEvaluation,
      tone: "danger",
      description: "Candidates waiting for selector action.",
    },
  ];

  const recentCandidates = candidates.slice(0, 3);
  const priorityCandidates = candidates.filter(isReadyForEvaluation).slice(0, 3);

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
                  Selector Workspace
                </p>

                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Review candidate progress and complete selector decisions
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Monitor verification, technical assessment, personality assessment,
                  final review status, and selector recommendations from one place.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/evaluation")}
                >
                  Open Evaluation Queue
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/selector/candidates")}
                >
                  Candidate Directory
                </Button>
              </div>
            </div>
          </section>

          {loading ? (
            <Card>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading selector dashboard...
              </p>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stageBuckets.map((item) => (
                  <MetricCard key={item.title} {...item} />
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-12">
                <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-7">
                  <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Stage-wise Workload
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Live workload calculated from backend application records.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <QueueRow
                      label="Verification Review"
                      value={derivedStats.verificationReview}
                      note="Pending or review-flagged applications"
                    />
                    <QueueRow
                      label="Technical Stage"
                      value={derivedStats.technical}
                      note="Candidates currently in technical assessment stage"
                    />
                    <QueueRow
                      label="Personality Stage"
                      value={derivedStats.personality}
                      note="Candidates currently in personality/interview stage"
                    />
                    <QueueRow
                      label="Final Review"
                      value={derivedStats.finalReview}
                      note="Candidates waiting near final decision"
                    />
                    <QueueRow
                      label="Completed"
                      value={derivedStats.completed}
                      note="Applications where selector decision is completed"
                    />
                  </div>
                </Card>

                <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-5">
                  <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Decision Summary
                      </h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Final selector outcomes from backend records.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DecisionBox label="Recommended" value={derivedStats.recommended} tone="success" />
                    <DecisionBox label="Rejected" value={derivedStats.rejected} tone="danger" />
                    <DecisionBox label="Hold" value={derivedStats.hold} tone="warning" />
                    <DecisionBox label="Waitlisted" value={derivedStats.waitlisted} tone="info" />
                  </div>
                </Card>
              </div>

              <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
                <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Priority Evaluation Queue
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Candidates currently ready for selector decision.
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate("/selector/evaluation")}
                  >
                    View Queue
                  </Button>
                </div>

                {priorityCandidates.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {priorityCandidates.map((candidate, index) => (
                      <CandidateCard
                        key={candidate._id || `priority-${index}`}
                        candidate={candidate}
                        actionLabel="Evaluate"
                        onClick={() => navigate(`/selector/evaluation/${candidate._id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No candidates are ready for final evaluation right now." />
                )}
              </Card>

              <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
                <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Candidate Activity
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Latest applications received from backend.
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate("/selector/candidates")}
                  >
                    View All
                  </Button>
                </div>

                {recentCandidates.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {recentCandidates.map((candidate, index) => (
                      <CandidateCard
                        key={candidate._id || `candidate-${index}`}
                        candidate={candidate}
                        actionLabel="View Candidate"
                        onClick={() => navigate(`/selector/candidate/${candidate._id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No candidate records found." />
                )}
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value ?? 0}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}

function QueueRow({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {note}
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {value ?? 0}
        </span>
      </div>
    </div>
  );
}

function DecisionBox({ label, value, tone }) {
  const toneMap = {
    success: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
    danger: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
    warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <span
        className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
          toneMap[tone]
        }`}
      >
        {value ?? 0}
      </span>
    </div>
  );
}

function CandidateCard({ candidate, actionLabel, onClick }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex flex-wrap gap-2">
        <Badge variant={getStageBadgeVariant(candidate.currentStage)}>
          {formatStage(candidate.currentStage)}
        </Badge>
      </div>

      <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
        {getCandidateName(candidate)}
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {getVacancyTitle(candidate)}
      </p>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Application ID: {candidate.cid || candidate.applicationId || "N/A"}
      </p>

      <div className="mt-4">
        <Button
          size="sm"
          variant="outline"
          fullWidth
          onClick={onClick}
          disabled={!candidate._id}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}