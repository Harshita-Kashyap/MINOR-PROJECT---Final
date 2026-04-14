// src/components/applicant/ApplicationStatusCard.jsx
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function getVariant(status) {
  if (status.includes("Assigned")) return "warning";
  if (status.includes("Review")) return "info";
  if (status.includes("Selected")) return "success";
  if (status.includes("Rejected")) return "danger";
  return "default";
}

export default function ApplicationStatusCard({ application }) {
  return (
    <Card className="space-y-3">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white">
        {application.title}
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">Current Status</span>
        <Badge variant={getVariant(application.status)}>
          {application.status}
        </Badge>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Updated on: {application.updatedOn}
      </p>
    </Card>
  );
}