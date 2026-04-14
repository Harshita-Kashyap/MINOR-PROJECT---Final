// src/components/applicant/VacancyCard.jsx
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function VacancyCard({ vacancy }) {
  return (
    <Card hover className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {vacancy.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {vacancy.department}
          </p>
        </div>
        <Badge variant="info">{vacancy.status}</Badge>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Last date: {vacancy.deadline}
      </p>

      <div className="flex gap-2">
        <Button size="sm">View Details</Button>
        <Button size="sm" variant="outline">Apply</Button>
      </div>
    </Card>
  );
}