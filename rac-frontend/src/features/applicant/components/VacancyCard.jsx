import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  applyToVacancy,
  hasApplied,
} from "../../../shared/utils/applicationStorage";
import { isProfileComplete } from "../../../shared/utils/profileStorage";

export default function VacancyCard({ vacancy }) {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  const profileComplete = isProfileComplete();

  useEffect(() => {
    setApplied(hasApplied(vacancy.id));
  }, [vacancy.id]);

  const handleApply = () => {
    if (!profileComplete) {
      alert("Please complete your profile before applying for a vacancy.");
      navigate("/applicant/profile");
      return;
    }

    const success = applyToVacancy(vacancy);
    if (success) {
      setApplied(true);
    }
  };

  return (
    <Card className="group h-full border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80">
      <div className="flex h-full flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                {vacancy.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {vacancy.department}
              </p>
            </div>

            <Badge variant="info">{vacancy.status}</Badge>
          </div>

          <div className="grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-900/40">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-900 dark:text-white">
                Last Date:
              </span>{" "}
              {vacancy.deadline}
            </p>

            {vacancy.location && (
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  Location:
                </span>{" "}
                {vacancy.location}
              </p>
            )}

            {vacancy.mode && (
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  Mode:
                </span>{" "}
                {vacancy.mode}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            size="sm"
            variant="outline"
            fullWidth
            onClick={() => navigate(`/applicant/vacancies/${vacancy.id}`)}
          >
            View Details
          </Button>

          <Button
            size="sm"
            fullWidth
            onClick={handleApply}
            disabled={applied}
            variant={applied ? "secondary" : "primary"}
          >
            {applied
              ? "Applied"
              : profileComplete
              ? "Apply Now"
              : "Complete Profile First"}
          </Button>
        </div>
      </div>
    </Card>
  );
}