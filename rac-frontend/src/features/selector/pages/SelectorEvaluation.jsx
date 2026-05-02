import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  getSelectorCandidateById,
  submitEvaluation,
} from "../services/selectorService";
import {
  SELECTOR_STAGES,
  normalizeStage,
  formatStage,
  getCandidateName,
  getCompositeScore,
  getStageBadgeVariant,
  getVacancyTitle,
  isReadyForEvaluation,
} from "../utils/selectorHelpers";

const DECISION_OPTIONS = [
  { label: "Recommended", value: "RECOMMENDED" },
  { label: "Waitlisted", value: "WAITLISTED" },
  { label: "Hold", value: "HOLD" },
  { label: "Not Recommended", value: "NOT_RECOMMENDED" },
];

export default function SelectorEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);

        if (!id || id === "1") {
          setCandidate(null);
          return;
        }

        const res = await getSelectorCandidateById(id);
        const loadedCandidate = res.candidate || null;

        setCandidate(loadedCandidate);
        setRemarks(loadedCandidate?.selectorRemarks || loadedCandidate?.finalRemarks || "");
      } catch (error) {
        console.error(error);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const stage = normalizeStage(candidate?.currentStage, candidate);
  const stageReadyForDecision = candidate ? isReadyForEvaluation(candidate) : false;

  const total = useMemo(() => {
    if (!candidate) return 0;
    return candidate.overallScore || getCompositeScore(candidate);
  }, [candidate]);

  const systemSuggestion = useMemo(() => {
    if (!candidate) return "Awaiting Candidate";

    if (stage !== SELECTOR_STAGES.FINAL_REVIEW) {
      return "Awaiting Final Review";
    }

    const technical = Number(candidate.technicalScore || 0);
    const personality = Number(candidate.personalityScore || 0);

    if (technical > 0 && personality > 0) {
      if (total >= 18) return "Recommended";
      if (total >= 12) return "Waitlisted / Hold";
      return "Not Recommended";
    }

    return "Review Required";
  }, [candidate, stage, total]);

  const handleSubmit = async () => {
    if (!stageReadyForDecision || !decision) return;

    try {
      setSubmitting(true);

      await submitEvaluation({
        applicationId: id,
        decision,
        remarks,
      });

      navigate("/selector/evaluation");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Error submitting evaluation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading candidate evaluation...
          </p>
        </Card>
      </PageShell>
    );
  }

  if (!candidate) {
    return (
      <PageShell>
        <Card className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Candidate not found
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Invalid candidate ID: {id}
          </p>

          <div className="mt-5">
            <Button onClick={() => navigate("/selector/evaluation")}>
              Back to Evaluation Queue
            </Button>
          </div>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                Final Selector Review
              </p>

              <h1 className="text-2xl font-semibold sm:text-3xl">
                {getCandidateName(candidate)}
              </h1>

              <p className="mt-2 text-sm text-blue-100">
                {candidate.cid || candidate.applicationId || candidate._id}
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                {getVacancyTitle(candidate)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant={getStageBadgeVariant(stage, candidate)}>
                  {formatStage(stage, candidate)}
                </Badge>

                <Badge variant={candidate.verificationStatus === "ELIGIBLE" ? "success" : "warning"}>
                  Verification: {candidate.verificationStatus || "N/A"}
                </Badge>

                <Badge variant="info">
                  Final Status: {candidate.finalStatus || "NOT_DECIDED"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate(`/selector/candidate/${candidate._id}`)}
              >
                View Profile
              </Button>

              <Button
                variant="outlineWhite"
                onClick={() => navigate("/selector/evaluation")}
              >
                Back to Queue
              </Button>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ScoreMetric
            label="Technical Score"
            value={candidate.technicalScore ?? "-"}
            note={candidate.technicalTestStatus || "N/A"}
          />

          <ScoreMetric
            label="Personality Score"
            value={candidate.personalityScore ?? "-"}
            note={candidate.personalityTestStatus || "N/A"}
          />

          <ScoreMetric
            label="Overall Score"
            value={total}
            note="Technical + Personality"
          />

          <ScoreMetric
            label="System Suggestion"
            value={systemSuggestion}
            note="Decision support only"
          />
        </div>

        {!stageReadyForDecision && (
          <Card className="border border-amber-200 bg-amber-50/80 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/20">
            <h2 className="text-base font-semibold text-amber-800 dark:text-amber-300">
              Final review is not available yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
              Selector can submit a final decision only after the candidate reaches{" "}
              <span className="font-semibold">Final Review</span>. This happens
              automatically after the candidate submits the personality test.
            </p>
          </Card>
        )}

        <div className="grid gap-6 xl:grid-cols-12">
          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-7">
            <SectionHeader
              title="Candidate Score Summary"
              subtitle="Final judgement should be based on technical, personality, and overall score."
            />

            <div className="grid gap-3 sm:grid-cols-3">
              <MiniScore label="Technical" value={candidate.technicalScore ?? "-"} />
              <MiniScore label="Personality" value={candidate.personalityScore ?? "-"} />
              <MiniScore label="Overall" value={total} />
            </div>

            <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Backend Remarks
              </p>

              <div className="mt-3 space-y-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Technical:</strong>{" "}
                  {candidate.technicalRemarks || "No technical remarks available."}
                </p>

                <p>
                  <strong>Personality:</strong>{" "}
                  {candidate.personalityRemarks || "No personality remarks available."}
                </p>

                <p>
                  <strong>Final:</strong>{" "}
                  {candidate.finalReason || candidate.finalRemarks || "No final remarks yet."}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-5">
            <SectionHeader
              title="Final Selector Decision"
              subtitle="This is the only manual decision step in the selector workflow."
            />

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Decision
                </label>

                <select
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  disabled={!stageReadyForDecision}
                >
                  <option value="">Select final decision</option>

                  {DECISION_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selector Remarks
                </label>

                <textarea
                  placeholder="Add final review remarks..."
                  className="min-h-[150px] w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  disabled={!stageReadyForDecision}
                />
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Selected Decision
                </p>

                <div className="mt-2">
                  <span className={getDecisionBadge(decision || "PENDING")}>
                    {decision ? decision.replaceAll("_", " ") : "Pending"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/selector/evaluation")}
                >
                  Back to Queue
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!stageReadyForDecision || !decision || submitting}
                >
                  {submitting ? "Submitting..." : "Submit Final Decision"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ScoreMetric({ label, value, note }) {
  return (
    <Card className="border border-gray-200/80 bg-gradient-to-br from-white to-gray-50 shadow-sm dark:border-gray-700/80 dark:from-gray-800 dark:to-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
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

function getDecisionBadge(decision) {
  switch (decision) {
    case "RECOMMENDED":
      return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "WAITLISTED":
      return "inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "HOLD":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "NOT_RECOMMENDED":
      return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
}