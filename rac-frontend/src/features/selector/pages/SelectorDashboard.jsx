import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  getSelectorCandidates,
  getSelectorDashboardStats,
} from "../services/selectorService";

export default function SelectorDashboard() {
  const navigate = useNavigate();
  const stats = getSelectorDashboardStats();
  const candidates = getSelectorCandidates();

  const stageBuckets = [
    {
      title: "Verification Review",
      value: stats.verificationReview,
      tone: "warning",
      description: "Profiles needing review or clarification.",
    },
    {
      title: "Verification Rejected",
      value: stats.verificationRejected,
      tone: "danger",
      description: "Applications rejected at verification stage.",
    },
    {
      title: "Technical Assigned",
      value: stats.technicalAssigned,
      tone: "info",
      description: "Candidates currently in technical evaluation.",
    },
    {
      title: "Final Review",
      value: stats.finalReview,
      tone: "default",
      description: "Candidates ready for selector decision.",
    },
  ];

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
                  Review verified candidates and finalize recommendations
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Monitor applicant progression across verification, technical evaluation,
                  personality assessment, and final selector recommendation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/candidates")}
                >
                  View Candidates
                </Button>

                <Button
                  variant="outlineWhite"
                  onClick={() => navigate("/selector/analytics")}
                >
                  Open Analytics
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stageBuckets.map((item) => (
              <MetricCard key={item.title} {...item} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-7 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Stage-wise Review Queues
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Current selector workload by system-driven recruitment stage.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <QueueRow
                  label="Verification Review"
                  value={stats.verificationReview}
                  note="Profiles with mismatches or review flags"
                />
                <QueueRow
                  label="Technical Assigned"
                  value={stats.technicalAssigned}
                  note="Candidates awaiting technical test completion"
                />
                <QueueRow
                  label="Technical Shortlisted"
                  value={stats.technicalShortlisted}
                  note="Candidates moved to personality stage"
                />
                <QueueRow
                  label="Final Review"
                  value={stats.finalReview}
                  note="Candidates ready for final selector recommendation"
                />
              </div>
            </Card>

            <Card className="xl:col-span-5 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Immediate Attention
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Priority actions requiring selector review.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <PriorityItem text="Review candidates flagged during verification." />
                <PriorityItem text="Inspect technical outcomes for shortlisted applicants." />
                <PriorityItem text="Submit final recommendations for candidates in final review." />
              </div>
            </Card>
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Candidate Activity
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Quick access to active profiles across workflow stages.
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

            <div className="grid gap-4 md:grid-cols-3">
              {recentCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {candidate.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {candidate.vacancy}
                  </p>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    Current Stage:{" "}
                    <span className="font-medium">{candidate.currentStage.replaceAll("_", " ")}</span>
                  </p>

                  <div className="mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      fullWidth
                      onClick={() => navigate(`/selector/candidate/${candidate.id}`)}
                    >
                      View Candidate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
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
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
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
          <p className="text-base font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{note}</p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {value}
        </span>
      </div>
    </div>
  );
}

function PriorityItem({ text }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-gray-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-gray-200">
      {text}
    </div>
  );
}