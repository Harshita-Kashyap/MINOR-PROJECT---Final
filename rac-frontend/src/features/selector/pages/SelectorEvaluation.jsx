import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidateById } from "../services/selectorService";

export default function SelectorEvaluation() {
  const { id } = useParams();
  const candidate = getSelectorCandidateById(id);

  const [decision, setDecision] = useState("");
  const [remarks, setRemarks] = useState(candidate?.remarks || "");

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <SelectorRibbon />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Card>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Candidate not found
            </h1>
          </Card>
        </main>
      </div>
    );
  }

  const total = Number(candidate.profileScore) + Number(candidate.technical) + Number(candidate.personality);

  const autoDecision = useMemo(() => {
    if (candidate.currentStage !== "FINAL_REVIEW") return "Awaiting Stage Completion";
    if (total >= 220) return "Recommended";
    if (total >= 180) return "Hold";
    return "Not Recommended";
  }, [candidate.currentStage, total]);

  const stageReadyForDecision = candidate.currentStage === "FINAL_REVIEW";

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
                Candidate ID: {candidate.cid}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="info">{candidate.currentStage.replaceAll("_", " ")}</Badge>
              <Badge variant={candidate.verificationStatus === "ELIGIBLE" ? "success" : candidate.verificationStatus === "REVIEW" ? "warning" : "danger"}>
                Verification: {candidate.verificationStatus}
              </Badge>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-8 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {candidate.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {candidate.vacancy}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="info">Profile Score: {candidate.profileScore}</Badge>
                    <Badge variant="warning">GATE: {candidate.gate}</Badge>
                    <Badge variant="success">Verification: {candidate.verificationScore}%</Badge>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 px-5 py-4 text-left dark:bg-gray-900/40 md:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Composite Score
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {total}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Profile + Technical + Personality
                  </p>
                </div>
              </div>
            </Card>

            <Card className="xl:col-span-4 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                System Recommendation
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Suggested final outcome based on verified profile and system-generated scores.
              </p>
              <div className="mt-4">
                <span className={getDecisionBadge(autoDecision)}>{autoDecision}</span>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Score Summary
              </h2>

              <div className="space-y-4">
                <InfoRow label="Profile Merit Score" value={candidate.profileScore} valueClass="text-blue-600 dark:text-blue-400" />
                <InfoRow label="Technical Score" value={candidate.technical} valueClass="text-green-600 dark:text-green-400" />
                <InfoRow label="Personality Score" value={candidate.personality} valueClass="text-purple-600 dark:text-purple-400" />
                <InfoRow label="Overall Score" value={total} valueClass="text-blue-600 dark:text-blue-400" />
              </div>
            </Card>

            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Verification Summary
              </h2>

              <div className="space-y-4">
                <InfoRow
                  label="Profile Status"
                  value={candidate.verificationStatus}
                  valueClass={
                    candidate.verificationStatus === "ELIGIBLE"
                      ? "text-green-600 dark:text-green-400"
                      : candidate.verificationStatus === "REVIEW"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }
                />
                <InfoRow
                  label="Verification Score"
                  value={`${candidate.verificationScore}%`}
                  valueClass="text-blue-600 dark:text-blue-400"
                />
                <InfoRow
                  label="Reason / Remark"
                  value={candidate.verificationReason || "No verification issue found"}
                  valueClass="text-gray-800 dark:text-gray-200"
                />
              </div>
            </Card>
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Final Selector Decision
            </h2>

            {!stageReadyForDecision && (
              <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-gray-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-gray-200">
                Final selector decision is available only when the candidate reaches the <span className="font-semibold">FINAL REVIEW</span> stage.
              </div>
            )}

            <div className="grid gap-4">
              <select
                className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                disabled={!stageReadyForDecision}
              >
                <option value="">Select Decision</option>
                <option>Recommended</option>
                <option>Not Recommended</option>
                <option>Hold</option>
              </select>

              <textarea
                placeholder="Add selector remarks, decision justification, or observations..."
                className="min-h-[140px] w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-900"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={!stageReadyForDecision}
              />

              <div className="flex justify-end">
                <Button disabled={!stageReadyForDecision || !decision}>
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

function InfoRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <span className={`text-sm font-semibold text-right ${valueClass}`}>{value}</span>
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