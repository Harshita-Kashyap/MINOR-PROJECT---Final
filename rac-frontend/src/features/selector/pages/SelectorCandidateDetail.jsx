import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getSelectorCandidateById } from "../services/selectorService";
import { useEffect, useMemo, useState } from "react";
import {
  SELECTOR_STAGES,
  normalizeStage,
  formatStage,
  getCandidateEmail,
  getCandidateName,
  getCompositeScore,
  getPersonalityScore,
  getStageBadgeVariant,
  getTechnicalScore,
  getVacancyTitle,
  isReadyForEvaluation,
} from "../utils/selectorHelpers";

const workflowSteps = [
  SELECTOR_STAGES.APPLIED,
  SELECTOR_STAGES.VERIFICATION_PENDING,
  SELECTOR_STAGES.VERIFICATION_ELIGIBLE,
  SELECTOR_STAGES.TECHNICAL_TEST_ASSIGNED,
  SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED,
  SELECTOR_STAGES.TECHNICAL_QUALIFIED,
  SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED,
  SELECTOR_STAGES.PERSONALITY_TEST_SUBMITTED,
  SELECTOR_STAGES.FINAL_REVIEW,
  SELECTOR_STAGES.SELECTED,
];

export default function SelectorCandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const res = await getSelectorCandidateById(id);
        setCandidate(res.candidate || null);
      } catch (err) {
        console.error(err);
        setCandidate(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCandidate();
  }, [id]);

  const total = useMemo(() => {
    if (!candidate) return 0;
    return candidate.overallScore || getCompositeScore(candidate);
  }, [candidate]);

  if (loading) {
    return (
      <PageShell>
        <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading candidate details...
          </p>
        </Card>
      </PageShell>
    );
  }

  if (!candidate) {
    return (
      <PageShell>
        <Card className="border border-gray-200/80 text-center shadow-sm dark:border-gray-700/80">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Candidate not found
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The candidate may not exist or the record could not be loaded.
          </p>

          <div className="mt-5">
            <Button onClick={() => navigate("/selector/candidates")}>
              Back to Candidates
            </Button>
          </div>
        </Card>
      </PageShell>
    );
  }

  const profile = candidate.profileId || {};
  const timeline = Array.isArray(candidate.timeline) ? candidate.timeline : [];
  const normalizedStage = normalizeStage(candidate.currentStage, candidate);
  const canEvaluate = isReadyForEvaluation(candidate);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
                  Candidate Profile
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
                  <Badge variant={getStageBadgeVariant(candidate.currentStage, candidate)}>
                    {formatStage(candidate.currentStage, candidate)}
                  </Badge>

                  <Badge variant={getVerificationVariant(candidate.verificationStatus)}>
                    Verification: {candidate.verificationStatus || "N/A"}
                  </Badge>

                  <Badge variant="warning">
                    Match Score: {candidate.verificationScore || 0}%
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/selector/candidates")}
                >
                  Back to Candidates
                </Button>

                {canEvaluate && (
                  <Button
                    variant="outlineWhite"
                    onClick={() => navigate(`/selector/evaluation/${candidate._id}`)}
                  >
                    Open Evaluation
                  </Button>
                )}
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ScoreMetric
              label="Verification"
              value={`${candidate.verificationScore || 0}%`}
              note={candidate.verificationStatus || "N/A"}
            />

            <ScoreMetric
              label="Technical"
              value={getTechnicalScore(candidate)}
              note={candidate.technicalTestStatus || "Not assigned"}
            />

            <ScoreMetric
              label="Personality"
              value={getPersonalityScore(candidate)}
              note={candidate.personalityTestStatus || "Not assigned"}
            />

            <ScoreMetric
              label="Overall"
              value={total}
              note={candidate.finalStatus || "N/A"}
            />
          </div>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <SectionHeader
              title="Workflow Progress"
              subtitle="Current application movement across the selector workflow."
            />

            <Progress stage={normalizedStage} candidate={candidate} />
          </Card>

          <div className="grid gap-6 xl:grid-cols-12">
            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-8">
              <SectionHeader
                title="Profile Summary"
                subtitle="Applicant, vacancy, and application metadata from backend records."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard label="Name" value={getCandidateName(candidate)} />
                <InfoCard label="Email" value={getCandidateEmail(candidate)} />
                <InfoCard label="Phone" value={candidate.userId?.phone || profile.mobile || "N/A"} />
                <InfoCard label="Vacancy" value={getVacancyTitle(candidate)} />
                <InfoCard label="Department" value={candidate.vacancyId?.department || candidate.department || "N/A"} />
                <InfoCard label="Applied On" value={formatDate(candidate.appliedAt || candidate.createdAt)} />
              </div>
            </Card>

            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-4">
              <SectionHeader
                title="Decision Readiness"
                subtitle="Whether this candidate can receive a selector decision now."
              />

              <div
                className={`rounded-2xl border px-4 py-4 ${
                  canEvaluate
                    ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/60 dark:bg-green-950/20 dark:text-green-300"
                    : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-300"
                }`}
              >
                <p className="text-sm font-semibold">
                  {canEvaluate ? "Ready for Evaluation" : "Not Ready Yet"}
                </p>

                <p className="mt-2 text-sm leading-6">
                  {canEvaluate
                    ? "Candidate has reached final review and can receive selector decision."
                    : "Candidate must reach final review before selector decision."}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <ScoreRow label="Current Stage" value={formatStage(candidate.currentStage, candidate)} />
                <ScoreRow label="Selector Decision" value={candidate.selectorDecision || "PENDING"} />
                <ScoreRow label="Final Status" value={candidate.finalStatus || "N/A"} />
              </div>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Section title="Applicant Personal Data">
              <DetailGrid>
                <DetailItem label="Full Name">{profile.fullName || getCandidateName(candidate)}</DetailItem>
                <DetailItem label="Mobile">{profile.mobile || candidate.userId?.phone || "N/A"}</DetailItem>
                <DetailItem label="Category">{profile.category || "N/A"}</DetailItem>
                <DetailItem label="Gender">{profile.gender || "N/A"}</DetailItem>
                <DetailItem label="Nationality">{profile.nationality || "N/A"}</DetailItem>
                <DetailItem label="Domicile State">{profile.domicileState || "N/A"}</DetailItem>
              </DetailGrid>
            </Section>

            <Section title="Academic Snapshot">
              <div className="space-y-3">
                <DetailItem label="10th">{formatAcademic(profile, "tenth")}</DetailItem>
                <DetailItem label="12th">{formatAcademic(profile, "twelfth")}</DetailItem>
                <DetailItem label="Graduation">{formatGraduation(profile)}</DetailItem>
                <DetailItem label="GATE Score">{profile.gateScore || candidate.gate || "N/A"}</DetailItem>
              </div>
            </Section>

            <Section title="Verification Review">
              <div className="space-y-3">
                <ChecklistItem
                  label="Verification Status"
                  status={getVerificationChecklistStatus(candidate.verificationStatus)}
                />

                <DetailItem label="Verification Reason">
                  {candidate.verificationReason || "No verification reason available."}
                </DetailItem>

                <DetailItem label="Verification Score">
                  {candidate.verificationScore || 0}%
                </DetailItem>
              </div>
            </Section>

            <Section title="Evaluation Summary">
              <div className="space-y-3">
                <DetailItem label="Technical Test Status">
                  {candidate.technicalTestStatus || "Not assigned"}
                </DetailItem>

                <DetailItem label="Technical Score">
                  {getTechnicalScore(candidate)}
                </DetailItem>

                <DetailItem label="Personality Test Status">
                  {candidate.personalityTestStatus || "Not assigned"}
                </DetailItem>

                <DetailItem label="Personality Score">
                  {getPersonalityScore(candidate)}
                </DetailItem>
              </div>
            </Section>

            <Section title="Selector Notes">
              <div className="space-y-3">
                <DetailItem label="Selector Decision">
                  {candidate.selectorDecision || "PENDING"}
                </DetailItem>

                <DetailItem label="Remarks">
                  {candidate.selectorRemarks || candidate.finalRemarks || "No remarks added yet."}
                </DetailItem>
              </div>
            </Section>

            <Section title="Timeline">
              <div className="space-y-3">
                {timeline.length > 0 ? (
                  timeline.map((item, index) => (
                    <TimelineItem
                      key={`${item.stage || "stage"}-${index}`}
                      stage={item.stage}
                      note={item.note}
                      date={item.date}
                      candidate={candidate}
                    />
                  ))
                ) : (
                  <DetailItem label="No timeline">
                    No timeline updates available yet.
                  </DetailItem>
                )}
              </div>
            </Section>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="outline" onClick={() => navigate("/selector/candidates")}>
              Back to Candidates
            </Button>

            {canEvaluate && (
              <Button onClick={() => navigate(`/selector/evaluation/${candidate._id}`)}>
                Open Evaluation
              </Button>
            )}
          </div>
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

function Section({ title, children }) {
  return (
    <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
      <SectionHeader title={title} />
      <div className="space-y-4">{children}</div>
    </Card>
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

function DetailGrid({ children }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-gray-900 dark:text-white">
        {value || "N/A"}
      </p>
    </div>
  );
}

function DetailItem({ label, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <div className="mt-2 break-words text-sm font-medium leading-6 text-gray-900 dark:text-white">
        {children || "N/A"}
      </div>
    </div>
  );
}

function ScoreMetric({ label, value, note }) {
  return (
    <Card className="border border-gray-200/80 bg-gradient-to-br from-white to-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 dark:from-gray-800 dark:to-gray-900">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value || "N/A"}
      </h2>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {note || "N/A"}
      </p>
    </Card>
  );
}

function ScoreRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-900/40">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {value || "N/A"}
      </span>
    </div>
  );
}

function ChecklistItem({ label, status = "warning" }) {
  const statusMap = {
    success:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/20 dark:text-green-300",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900/60 dark:bg-yellow-950/20 dark:text-yellow-300",
    danger:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-300",
  };

  const statusText = {
    success: "Passed",
    warning: "Pending / Review",
    danger: "Failed",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${statusMap[status]}`}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-semibold">{statusText[status]}</span>
    </div>
  );
}

function Progress({ stage, candidate }) {
  const normalizedStage = normalizeStage(stage, candidate);

  let currentIndex = workflowSteps.indexOf(normalizedStage);

  if (normalizedStage === SELECTOR_STAGES.VERIFICATION_REVIEW) currentIndex = 1;
  if (normalizedStage === SELECTOR_STAGES.TECHNICAL_TEST_IN_PROGRESS) {
    currentIndex = workflowSteps.indexOf(SELECTOR_STAGES.TECHNICAL_TEST_ASSIGNED);
  }
  if (normalizedStage === SELECTOR_STAGES.TECHNICAL_SHORTLISTED) {
    currentIndex = workflowSteps.indexOf(SELECTOR_STAGES.TECHNICAL_QUALIFIED);
  }
  if (normalizedStage === SELECTOR_STAGES.PERSONALITY_TEST_IN_PROGRESS) {
    currentIndex = workflowSteps.indexOf(SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED);
  }
  if (normalizedStage === SELECTOR_STAGES.WAITLISTED || normalizedStage === SELECTOR_STAGES.FINAL_REJECTED) {
    currentIndex = workflowSteps.length - 1;
  }

  if (currentIndex < 0) currentIndex = 0;

  return (
    <div className="grid gap-3 sm:grid-cols-5 xl:grid-cols-10">
      {workflowSteps.map((step, index) => {
        const active = currentIndex >= index;
        const current = currentIndex === index;

        return (
          <div
            key={step}
            className={`rounded-2xl border px-3 py-4 transition ${
              active
                ? "border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/20"
                : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40"
            }`}
          >
            <div
              className={`mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                current
                  ? "bg-blue-700 text-white ring-4 ring-blue-100 dark:ring-blue-900/40"
                  : active
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {active ? "✓" : index + 1}
            </div>

            <p
              className={`text-center text-[11px] font-semibold leading-4 ${
                current
                  ? "text-gray-900 dark:text-white"
                  : active
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {formatStage(step, candidate)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function TimelineItem({ stage, note, date, candidate }) {
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {formatStage(stage, candidate)}
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {note || "No note available."}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
}

function getVerificationVariant(status) {
  if (status === "ELIGIBLE") return "success";
  if (status === "REVIEW" || status === "PENDING") return "warning";
  if (status === "REJECTED") return "danger";
  return "info";
}

function getVerificationChecklistStatus(status) {
  if (status === "ELIGIBLE") return "success";
  if (status === "REJECTED") return "danger";
  return "warning";
}

function formatDate(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAcademic(profile, level) {
  const board = profile?.[`${level}Board`];
  const school = profile?.[`${level}School`];
  const year = profile?.[`${level}Year`];
  const percentage = profile?.[`${level}Percentage`];

  const parts = [board, school, year, percentage ? `${percentage}%` : ""].filter(Boolean);
  return parts.length ? parts.join(" • ") : "N/A";
}

function formatGraduation(profile) {
  const degree = profile?.graduationDegree || profile?.qualification;
  const specialization = profile?.specialization;
  const institute = profile?.institute;
  const percentage = profile?.graduationPercentage;

  const parts = [degree, specialization, institute, percentage ? `${percentage}%` : ""].filter(Boolean);
  return parts.length ? parts.join(" • ") : "N/A";
}