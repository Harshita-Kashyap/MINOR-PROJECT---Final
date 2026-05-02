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
  SELECTOR_STAGES,
  normalizeStage,
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
        const [dashboard, candidateRes] = await Promise.all([
          getSelectorDashboard(),
          getSelectorCandidates(),
        ]);

        setDashboardStats(dashboard?.stats || {});
        setCandidates(Array.isArray(candidateRes?.candidates) ? candidateRes.candidates : []);
      } catch (err) {
        console.error("Selector dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const derivedStats = useMemo(() => {
    const technicalPending = candidates.filter(
      (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.VERIFICATION_ELIGIBLE
    ).length;

    const cutoffPending = candidates.filter(
      (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED
    ).length;

    const personalityPending = candidates.filter(
      (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.TECHNICAL_QUALIFIED
    ).length;

    const finalReview = candidates.filter(
      (c) => normalizeStage(c.currentStage, c) === SELECTOR_STAGES.FINAL_REVIEW
    ).length;

    const completed = candidates.filter((c) =>
      [
        SELECTOR_STAGES.SELECTED,
        SELECTOR_STAGES.WAITLISTED,
        SELECTOR_STAGES.FINAL_REJECTED,
      ].includes(normalizeStage(c.currentStage, c))
    ).length;

    return {
      total: dashboardStats.total ?? candidates.length,
      technicalPending,
      cutoffPending,
      personalityPending,
      finalReview,
      completed,
      readyForEvaluation: candidates.filter(isReadyForEvaluation).length,
      recommended: dashboardStats.recommended ?? 0,
      rejected: dashboardStats.rejected ?? 0,
      hold: dashboardStats.hold ?? 0,
      waitlisted: dashboardStats.waitlisted ?? 0,
    };
  }, [dashboardStats, candidates]);

  const stageBuckets = [
    {
      title: "Schedule Technical",
      value: derivedStats.technicalPending,
      tone: "warning",
      description: "Verified eligible candidates waiting for technical test.",
    },
    {
      title: "Apply Cutoff",
      value: derivedStats.cutoffPending,
      tone: "danger",
      description: "Technical submissions waiting for cutoff.",
    },
    {
      title: "Schedule Personality",
      value: derivedStats.personalityPending,
      tone: "info",
      description: "Technically qualified candidates waiting for personality test.",
    },
    {
      title: "Final Review",
      value: derivedStats.readyForEvaluation,
      tone: "success",
      description: "Candidates ready for final selector decision.",
    },
  ];

  const priorityCandidates = candidates.filter(isReadyForEvaluation).slice(0, 3);
  const recentCandidates = candidates.slice(0, 3);

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
                  Manage tests, cutoff, and final review decisions
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  The system automates eligibility, scoring, shortlisting, and stage movement.
                  Selector actions are limited to scheduling tests, applying cutoff, and final judgement.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/schedule-technical-test")}
                >
                  Schedule Technical
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/selector/technical-results")}
                >
                  Technical Results
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
                  <SectionHeader
                    title="Workflow Action Summary"
                    subtitle="Selector workload based on the automated recruitment pipeline."
                  />

                  <div className="space-y-4">
                    <QueueRow
                      label="Verified Eligible"
                      value={derivedStats.technicalPending}
                      note="Ready for vacancy-wise technical test assignment"
                      action="Schedule"
                      onClick={() => navigate("/selector/schedule-technical-test")}
                    />
                    <QueueRow
                      label="Technical Submitted"
                      value={derivedStats.cutoffPending}
                      note="Ready for cutoff filtering"
                      action="Set Cutoff"
                      onClick={() => navigate("/selector/technical-results")}
                    />
                    <QueueRow
                      label="Technical Qualified"
                      value={derivedStats.personalityPending}
                      note="Ready for personality test scheduling"
                      action="Schedule Personality"
                      onClick={() => navigate("/selector/technical-results")}
                    />
                    <QueueRow
                      label="Final Review"
                      value={derivedStats.readyForEvaluation}
                      note="Ready for manual final selector decision"
                      action="Evaluate"
                      onClick={() => navigate("/selector/evaluation")}
                    />
                  </div>
                </Card>

                <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-5">
                  <SectionHeader
                    title="Decision Summary"
                    subtitle="Final outcomes submitted by selector."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <DecisionBox label="Recommended" value={derivedStats.recommended} tone="success" />
                    <DecisionBox label="Rejected" value={derivedStats.rejected} tone="danger" />
                    <DecisionBox label="Hold" value={derivedStats.hold} tone="warning" />
                    <DecisionBox label="Waitlisted" value={derivedStats.waitlisted} tone="info" />
                  </div>
                </Card>
              </div>

              <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
                <SectionHeader
                  title="Priority Final Review Queue"
                  subtitle="Candidates currently ready for final selector decision."
                  action={
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("/selector/evaluation")}
                    >
                      View Queue
                    </Button>
                  }
                />

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
                <SectionHeader
                  title="Recent Candidate Activity"
                  subtitle="Latest application records from backend."
                  action={
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate("/selector/candidates")}
                    >
                      View All
                    </Button>
                  }
                />

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

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
    success: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-gray-800",
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

function QueueRow({ label, value, note, action, onClick }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-medium text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {note}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {value ?? 0}
          </span>

          <Button size="sm" variant="outline" onClick={onClick}>
            {action}
          </Button>
        </div>
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
        className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${toneMap[tone]}`}
      >
        {value ?? 0}
      </span>
    </div>
  );
}

function CandidateCard({ candidate, actionLabel, onClick }) {
  const stage = normalizeStage(candidate.currentStage, candidate);

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex flex-wrap gap-2">
        <Badge variant={getStageBadgeVariant(stage, candidate)}>
          {formatStage(stage, candidate)}
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