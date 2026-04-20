import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Badge from "../../../shared/components/ui/Badge";
import Button from "../../../shared/components/ui/Button";
import {
  getStageLabel,
  getStageTone,
  getNextAction,
} from "../utils/applicantHelpers";

function formatDate(dateValue) {
  if (!dateValue) return "-";
  return new Date(dateValue).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ApplicationStatusCard({ application }) {
  const navigate = useNavigate();

  return (
    <Card className="space-y-4 border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {application.vacancyTitle}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {application.department}
          </p>
        </div>

        <Badge variant={getStageTone(application.currentStage)}>
          {getStageLabel(application.currentStage)}
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Next Action
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {getNextAction(application)}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Last Updated
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {formatDate(application.lastUpdatedAt)}
          </p>
        </div>
      </div>

      {(application.verificationReason ||
        application.technicalRemarks ||
        application.finalReason) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 dark:border-amber-900/60 dark:bg-amber-950/20">
          <p className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-400">
            Remark / Reason
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-800 dark:text-gray-200">
            {application.finalReason ||
              application.technicalRemarks ||
              application.verificationReason}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/applicant/applications")}
        >
          View Progress
        </Button>
      </div>
    </Card>
  );
}