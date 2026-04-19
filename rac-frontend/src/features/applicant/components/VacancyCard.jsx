import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { applyToVacancy, hasApplied } from "../../../shared/utils/applicationStorage";
import { isProfileComplete } from "../../../shared/utils/profileStorage";

export default function VacancyCard({ vacancy }) {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  const profileComplete = isProfileComplete();
  
  useEffect(() => {
    setApplied(hasApplied(vacancy.id));
  }, [vacancy.id]);

  const handleApply = () => {
    if (!isProfileComplete()) {
      alert("Please complete your profile before applying for a vacancy.");
      navigate("/applicant/profile");
      return;
    }

    const success = applyToVacancy(vacancy);
    if (success) {
      setApplied(true);
      console.log("Applied for vacancy:", vacancy);
    }
  };

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
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/applicant/vacancies/${vacancy.id}`)}
        >
          View Details
        </Button>

        <Button
          size="sm"
          onClick={handleApply}
          disabled={applied}
          variant={applied ? "secondary" : "primary"}
        >
          {applied ? "Applied" : profileComplete ? "Apply Now" : "Complete Profile First"}
        </Button>
      </div>
    </Card>
  );
}