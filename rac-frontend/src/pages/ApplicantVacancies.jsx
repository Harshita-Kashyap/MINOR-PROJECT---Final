// src/pages/ApplicantVacancies.jsx
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import VacancyCard from "../components/applicant/VacancyCard";

export default function ApplicantVacancies() {
  const vacancies = [
    {
      id: "1",
      title: "Scientist B - Computer Science",
      department: "DRDO RAC",
      deadline: "20 Apr 2026",
      status: "Open",
      applied: false,
    },
    {
      id: "2",
      title: "Scientist B - Mechanical",
      department: "DRDO RAC",
      deadline: "25 Apr 2026",
      status: "Open",
      applied: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Available Vacancies
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </main>
    </div>
  );
}