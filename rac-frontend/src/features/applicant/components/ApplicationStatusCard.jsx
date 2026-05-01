import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import {
  APPLICATION_STAGES,
  getStageLabel,
  getStageTone,
  isFinalStage,
  getFinalResultLabel,
  getStageDescription,
  normalizeStage,
} from "../utils/applicantHelpers";

function valueOrDash(value) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

function formatDateTime(dateValue) {
  if (!dateValue) return "-";

  return new Date(dateValue).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getLatestTimelineStage(application) {
  const timeline = application?.timeline;

  if (Array.isArray(timeline) && timeline.length > 0) {
    return normalizeStage(timeline[timeline.length - 1]?.stage || application.currentStage);
  }

  return application.currentStage;
}

function getTrackerStages() {
  return [
    APPLICATION_STAGES.APPLIED,
    APPLICATION_STAGES.VERIFICATION_PENDING,
    APPLICATION_STAGES.VERIFICATION_ELIGIBLE,
    APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
    APPLICATION_STAGES.TECHNICAL_TEST_SUBMITTED,
    APPLICATION_STAGES.TECHNICAL_QUALIFIED,
    APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
    APPLICATION_STAGES.PERSONALITY_TEST_SUBMITTED,
    APPLICATION_STAGES.FINAL_REVIEW,
    APPLICATION_STAGES.SELECTED,
  ];
}

const REJECTED_STAGES = [
  APPLICATION_STAGES.VERIFICATION_REJECTED,
  APPLICATION_STAGES.TECHNICAL_REJECTED,
  APPLICATION_STAGES.FINAL_REJECTED,
];

export default function ApplicationStatusCard({ application }) {
  const navigate = useNavigate();

  const displayStage = normalizeStage(getLatestTimelineStage(application));
  const finalStage = isFinalStage(displayStage);
  const rejected = REJECTED_STAGES.includes(displayStage);

  const meritPosition =
    application.rank ||
    application.meritRank ||
    application.meritPosition ||
    application.finalRank ||
    "-";

  return (
    <Card className="space-y-5 border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80">      <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {application.vacancyTitle}
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {application.department}
        </p>
      </div>

      <Badge variant={getStageTone(displayStage)}>
        {getStageLabel(displayStage)}
      </Badge>
    </div>

      <StageTracker currentStage={displayStage} rejected={rejected} />

      {rejected && <RejectedBlock application={application} stage={displayStage} />}

      {finalStage && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400">
            Final Result
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {getFinalResultLabel(displayStage)}
          </p>

          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {application.finalRemarks ||
              application.finalReason ||
              getStageDescription(displayStage)}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-4">
        <ScoreBox label="Technical Score" value={application.technicalScore} />
        <ScoreBox label="Personality Score" value={application.personalityScore} />
        <ScoreBox label="Overall Score" value={application.overallScore} />
        <ScoreBox label="Merit Position" value={meritPosition} />
      </div>

      <Timeline timeline={application.timeline} />

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        {displayStage === APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED && (
          <Button
            onClick={() => navigate(`/applicant/technical-test/${application._id}`)}
          >
            Start Technical Test
          </Button>
        )}

        {displayStage === APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED && (
          <Button
            variant="outline"
            onClick={() =>
              navigate(`/applicant/personality-test/${application._id}`)
            }
          >
            Start Personality Test
          </Button>
        )}

      </div>
    </Card>
  );
}

function StageTracker({ currentStage, rejected }) {
  currentStage = normalizeStage(currentStage);
  const trackerStages = getTrackerStages();
  let activeIndex = trackerStages.findIndex((stage) => stage === currentStage);

  if (currentStage === APPLICATION_STAGES.VERIFICATION_REVIEW) activeIndex = 1;

  if (currentStage === APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS) {
    activeIndex = trackerStages.indexOf(APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED);
  }

  if (currentStage === APPLICATION_STAGES.TECHNICAL_SHORTLISTED) {
    activeIndex = trackerStages.indexOf(APPLICATION_STAGES.TECHNICAL_QUALIFIED);
  }

  if (currentStage === APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS) {
    activeIndex = trackerStages.indexOf(APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED);
  }

  if (
    currentStage === APPLICATION_STAGES.WAITLISTED ||
    currentStage === APPLICATION_STAGES.FINAL_REJECTED
  ) {
    activeIndex = trackerStages.length - 1;
  }

  if (activeIndex === -1) activeIndex = 0;

  const progressPercent =
    trackerStages.length <= 1
      ? 100
      : (activeIndex / (trackerStages.length - 1)) * 100;

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Application Progress
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {getStageLabel(currentStage)}
          </p>
        </div>

        <Badge variant={rejected ? "danger" : "info"}>
          {Math.round(progressPercent)}%
        </Badge>
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full ${rejected ? "bg-red-600" : "bg-blue-700"}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {trackerStages.map((stage, index) => {
          const completed = index <= activeIndex;
          const current = index === activeIndex;

          return (
            <div key={stage} className="min-w-0">
              <div
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${rejected && current
                    ? "bg-red-600 text-white ring-4 ring-red-100 dark:ring-red-900/40 scale-110"
                    : current
                      ? "bg-blue-700 text-white ring-4 ring-blue-100 dark:ring-blue-900/40 scale-110"
                      : completed
                        ? "bg-blue-700 text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                  }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <p
                className={`mt-2 text-center text-[11px] leading-4 ${current
                  ? "font-semibold text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
                  }`}
              >
                {getStageLabel(stage)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RejectedBlock({ application, stage }) {
  const reason =
    application.finalReason ||
    application.finalRemarks ||
    application.technicalRemarks ||
    application.verificationReason ||
    getStageDescription(stage);

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">
        Why this application was not cleared
      </p>

      <p className="mt-2 text-sm leading-6 text-gray-800 dark:text-gray-200">
        {reason}
      </p>
    </div>
  );
}

function ScoreBox({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {valueOrDash(value)}
      </p>
    </div>
  );
}

function Timeline({ timeline = [] }) {
  if (!Array.isArray(timeline) || timeline.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Application Timeline
      </p>

      <div className="mt-4 space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-1.5 flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-700" />

              {index !== timeline.length - 1 && (
                <div className="mt-1 h-full min-h-10 w-px bg-gray-200 dark:bg-gray-700" />
              )}
            </div>

            <div className="flex-1 pb-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {getStageLabel(item.stage)}
              </p>

              <p className="mt-0.5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {item.note || getStageDescription(item.stage)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {formatDateTime(item.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}