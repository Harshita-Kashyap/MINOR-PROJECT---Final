import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import VacancyCard from "../components/VacancyCard";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { applyToVacancy } from "../services/applicantService";
export default function ApplicantVacancies() {
  const navigate = useNavigate();

  // ✅ ADD THIS FUNCTION HERE
  const handleApply = async (id) => {
    try {
      await applyToVacancy(id);
      alert("Applied Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
  };

  const vacancies = [
    {
      id: "1",
      title: "Scientist B - Computer Science",
      department: "DRDO RAC",
      deadline: "20 Apr 2026",
      status: "Open",
      location: "New Delhi",
      mode: "Online Application",
    },
    {
      id: "2",
      title: "Scientist B - Mechanical",
      department: "DRDO RAC",
      deadline: "25 Apr 2026",
      status: "Open",
      location: "Hyderabad",
      mode: "Online Application",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
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

          <div className="grid gap-4 md:grid-cols-2">
            {vacancies.map((vacancy) => (
              <VacancyCard 
  key={vacancy.id} 
  vacancy={vacancy} 
  onApply={handleApply}
/>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}