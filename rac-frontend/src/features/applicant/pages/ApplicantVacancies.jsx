import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import VacancyCard from "../components/VacancyCard";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicantProfile, applyToVacancy, getApplicantApplications } from "../services/applicantService"; // ✅ UPDATED
import { getVacancies } from "../services/vacancyService";

export default function ApplicantVacancies() {
  const navigate = useNavigate();

  const [profileComplete, setProfileComplete] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATE (DO NOT REMOVE EXISTING)
  const [appliedVacancies, setAppliedVacancies] = useState([]);

  // ✅ UPDATED FETCH (ADDED APPLICATIONS ONLY)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // existing
        const data = await getVacancies();
        setVacancies(data);

        // 🔥 NEW (IMPORTANT)
        const apps = await getApplicantApplications();
        const appliedIds = apps.map(app => app.vacancyId);
        setAppliedVacancies(appliedIds);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ KEEP YOUR EXISTING APPLY FUNCTION
  const handleApply = async (id) => {
    try {
      await applyToVacancy(id);
      alert("Applied Successfully ✅");
    } catch (err) {
      alert(err.message || "Error applying");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">

          {/* HEADER */}
          <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Available Vacancies
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Review active openings, check details, and apply where eligible.
              </p>
            </div>

            <Button variant="outline" onClick={() => navigate("/applicant/dashboard")}>
              Back to Dashboard
            </Button>
          </section>

          {/* LOADING */}
          {loading ? (
            <p className="text-center text-gray-500">Loading vacancies...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {vacancies.length === 0 ? (
                <p className="text-gray-500">No vacancies available</p>
              ) : (
                vacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy._id}
                    vacancy={vacancy}
                    onApply={() => handleApply(vacancy._id)}

                    // 🔥 ONLY ADD THIS
                    appliedVacancies={appliedVacancies}
                  />
                ))
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}