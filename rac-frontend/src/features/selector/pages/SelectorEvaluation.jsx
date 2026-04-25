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
  formatStage,
  getCandidateName,
  getCompositeScore,
  getStageBadgeVariant,
  getVacancyTitle,
} from "../utils/selectorHelpers";

export default function SelectorEvaluation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);

        if (!id || id === "1") {
          setCandidate(null);
          return;
        }

        const res = await getSelectorCandidateById(id);
        setCandidate(res.candidate || null);
      } catch (error) {
        console.error(error);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  useEffect(() => {
    if (candidate) {
      setRemarks(candidate.selectorRemarks || "");
    }
  }, [candidate]);

  const total = useMemo(() => {
    if (!candidate) return 0;
    return getCompositeScore(candidate);
  }, [candidate]);

  const autoDecision = useMemo(() => {
    if (!candidate) return "Awaiting Candidate";
    if (candidate.currentStage !== "FINAL_REVIEW") {
      return "Awaiting Stage Completion";
    }

    if (total >= 220) return "Recommended";
    if (total >= 180) return "Hold";
    return "Not Recommended";
  }, [candidate, total]);

  const stageReadyForDecision = candidate?.currentStage === "FINAL_REVIEW";

  const handleSubmit = async () => {
    try {
      await submitEvaluation({
        applicationId: id,
        decision: decision.toUpperCase().replaceAll(" ", "_"),
        remarks,
      });

      navigate("/selector/evaluation");
    } catch (err) {
      console.error(err);
      alert("Error submitting evaluation");
    }
  };

  if (loading) {
    return (
      <PageShell>
        <Card>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loading candidate...
          </h1>
        </Card>
      </PageShell>
    );
  }

  if (!candidate) {
    return (
      <PageShell>
        <Card>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Candidate not found
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Invalid candidate ID: {id}
          </p>
          <div className="mt-4">
            <Button onClick={() => navigate("/selector/evaluation")}>
              Back to Evaluation Queue
            </Button>
          </div>
        </Card>
      </PageShell>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Candidate Evaluation
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Candidate ID: {candidate.cid || candidate.applicationId || candidate._id}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={getStageBadgeVariant(candidate.currentStage)}>
                {formatStage(candidate.currentStage)}
              </Badge>
              <Badge
                variant={
                  candidate.verificationStatus === "ELIGIBLE"
                    ? "success"
                    : candidate.verificationStatus === "REVIEW" ||
                      candidate.verificationStatus === "PENDING"
                    ? "warning"
                    : "danger"
                }
              >
                Verification: {candidate.verificationStatus || "N/A"}
              </Badge>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {getCandidateName(candidate)}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {getVacancyTitle(candidate)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="success">
                      Verification: {candidate.verificationScore || 0}%
                    </Badge>
                    <Badge variant="info">
                      Technical: {candidate.technicalScore ?? "-"}
                    </Badge>
                    <Badge variant="warning">
                      Personality: {candidate.personalityScore ?? "-"}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 px-5 py-4 text-left dark:bg-gray-900/40 md:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Composite Score
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {candidate.overallScore || total}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Verification + Technical + Personality
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-4">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                System Recommendation
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Suggested outcome based on backend scores and final review stage.
              </p>
              <div className="mt-4">
                <span className={getDecisionBadge(autoDecision)}>
                  {autoDecision}
                </span>
              </div>
            </Card>
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Final Selector Decision
            </h2>

            {!stageReadyForDecision && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-gray-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-gray-200">
                Final selector decision is available only when the candidate reaches{" "}
                <span className="font-semibold">FINAL REVIEW</span>.
              </div>
            )}

            <div className="grid gap-4">
              <select
                className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                disabled={!stageReadyForDecision}
              >
                <option value="">Select Decision</option>
                <option>Recommended</option>
                <option>Not Recommended</option>
                <option>Hold</option>
                <option>Waitlisted</option>
              </select>

              <textarea
                placeholder="Add selector remarks..."
                className="min-h-[140px] w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={!stageReadyForDecision}
              />

              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/selector/evaluation")}
                >
                  Back to Queue
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={!stageReadyForDecision || !decision}
                >
                  Submit Evaluation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <SelectorRibbon />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

function getDecisionBadge(decision) {
  switch (decision) {
    case "Recommended":
      return "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "Hold":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Not Recommended":
      return "inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
}