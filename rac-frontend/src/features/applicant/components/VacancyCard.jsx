import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";

export default function VacancyCard({ vacancy, appliedVacancies, onApply }) {
  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);

  // ❌ REMOVE THIS
  // const profileComplete = isProfileComplete();

  // ✅ NEW: derive from backend
  const profileComplete = true; // already handled in parent

  // ✅ IMPORTANT: set applied from backend
  useEffect(() => {
    setApplied(appliedVacancies?.includes(vacancy._id));
  }, [appliedVacancies, vacancy._id]);

  const handleApply = async () => {
    if (!profileComplete) {
      alert("Please complete your profile before applying for a vacancy.");
      navigate("/applicant/profile");
      return;
    }

    try {
      await onApply();
      setApplied(true);
    } catch (err) {
      alert(err.message || "Error applying");
    }
  };

  return (
    <Card className="group h-full border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80">
      <div className="flex h-full flex-col justify-between space-y-4">

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                {vacancy.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {vacancy.department}
              </p>
            </div>

            <Badge variant="info">{vacancy.status}</Badge>
          </div>

          <div className="grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-900/40">
            <p>
              <strong>Last Date:</strong> {vacancy.deadline}
            </p>

            {vacancy.location && (
              <p><strong>Location:</strong> {vacancy.location}</p>
            )}

            {vacancy.mode && (
              <p><strong>Mode:</strong> {vacancy.mode}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            size="sm"
            variant="outline"
            fullWidth
            onClick={() => navigate(`/applicant/vacancies/${vacancy._id}`)}
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
            {applied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
}