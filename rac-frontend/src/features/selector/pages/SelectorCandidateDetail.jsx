import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidateById } from "../services/selectorService";
import { useEffect, useState } from "react";

export default function SelectorCandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await getSelectorCandidateById(id);
        setCandidate(res.candidate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidate();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Candidate Detail
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {candidate.cid}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="info">{candidate.currentStage.replaceAll("_", " ")}</Badge>
              <Badge
                variant={
                  candidate.verificationStatus === "ELIGIBLE"
                    ? "success"
                    : candidate.verificationStatus === "REVIEW"
                      ? "warning"
                      : "danger"
                }
              >
                Verification: {candidate.verificationStatus}
              </Badge>
              <Badge variant="warning">Match Score: {candidate.verificationScore}%</Badge>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="xl:col-span-8 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Candidate Profile Summary
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard label="Name" value={candidate.userId?.name} />
                <InfoCard label="Email" value={candidate.userId?.email} />
                <InfoCard label="Phone" value={candidate.userId?.phone} />
                <InfoCard label="Education" value={candidate.education} />
                <InfoCard label="Experience" value={candidate.experience} />
                <InfoCard label="Vacancy" value={candidate.vacancyId?.title} />
              </div>
            </Card>

            <Card className="xl:col-span-4 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Score Snapshot
              </h2>

              <div className="space-y-4">
                <ScoreRow label="Profile Score" value={candidate.profileScore} color="blue" />
                <ScoreRow label="GATE Score" value={candidate.gate} color="purple" />
                <ScoreRow label="Technical Score" value={candidate.technical || "-"} color="green" />
                <ScoreRow label="Personality Score" value={candidate.personality || "-"} color="amber" />
                <ScoreRow label="Overall Score" value={total} color="blue" />
              </div>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Section title="Parsed Resume Data">
              <DetailItem label="Skills">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </DetailItem>
              <DetailItem label="Projects">{candidate.projects}</DetailItem>
            </Section>

            <Section title="Academic Snapshot">
              <DetailItem label="10th">{candidate.academics.tenth}</DetailItem>
              <DetailItem label="12th">{candidate.academics.twelfth}</DetailItem>
              <DetailItem label="Graduation">{candidate.academics.graduation}</DetailItem>
            </Section>

            <Section title="Verification Review">
              <ChecklistItem label="Verification Status" status={candidate.verificationStatus === "ELIGIBLE" ? "success" : candidate.verificationStatus === "REVIEW" ? "warning" : "danger"} />
              <DetailItem label="Verification Reason">
                {candidate.verificationReason || "No verification issue found."}
              </DetailItem>
            </Section>

            <Section title="Stage Progress">
              <Progress stage={candidate.currentStage} />
            </Section>

            <Section title="Evaluation Summary">
              <DetailItem label="Technical Score">{candidate.technical || "-"}</DetailItem>
              <DetailItem label="Personality Score">{candidate.personality || "-"}</DetailItem>
              <DetailItem label="Current Status">{candidate.status}</DetailItem>
            </Section>

            <Section title="Selector Notes">
              <DetailItem label="Remarks">{candidate.remarks || "No remarks added yet."}</DetailItem>
            </Section>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate("/selector/candidates")}>
              Back to Candidates
            </Button>

            <Button onClick={() => navigate(`/selector/evaluation/${candidate._id}`)}>
              Open Evaluation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function DetailItem({ label, children }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
        {children}
      </div>
    </div>
  );
}

function ScoreRow({ label, value, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    amber: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorMap[color]}`}>
        {value}
      </span>
    </div>
  );
}

function ChecklistItem({ label, status = "success" }) {
  const statusMap = {
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    danger: "text-red-600 dark:text-red-400",
  };

  const statusText = {
    success: "Passed ✔",
    warning: "Pending Review",
    danger: "Failed",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <span className={`text-sm font-semibold ${statusMap[status]}`}>
        {statusText[status]}
      </span>
    </div>
  );
}

function Progress({ stage }) {
  const steps = [
    "VERIFICATION_REVIEW",
    "TECHNICAL",
    "PERSONALITY",
    "FINAL_REVIEW",
  ];
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <span
          key={i}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${currentIndex >= i
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          {step.replaceAll("_", " ")}
        </span>
      ))}
    </div>
  );
}