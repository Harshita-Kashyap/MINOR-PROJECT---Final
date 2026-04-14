// src/pages/ApplicantDashboard.jsx
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import ApplicantStats from "../components/applicant/ApplicantStats";
import VacancyCard from "../components/applicant/VacancyCard";
import ApplicationStatusCard from "../components/applicant/ApplicationStatusCard";

export default function ApplicantDashboard() {
  const stats = [
    { title: "Open Vacancies", value: 6 },
    { title: "Applied Jobs", value: 2 },
    { title: "Tests Pending", value: 1 },
    { title: "Final Results", value: 0 },
  ];

  const vacancies = [
    {
      id: 1,
      title: "Scientist B - Computer Science",
      department: "DRDO RAC",
      deadline: "20 Apr 2026",
      status: "Open",
    },
    {
      id: 2,
      title: "Scientist B - Electronics",
      department: "DRDO RAC",
      deadline: "24 Apr 2026",
      status: "Open",
    },
  ];

  const applications = [
    {
      title: "Scientist B - Computer Science",
      status: "Technical Test Assigned",
      updatedOn: "14 Apr 2026",
    },
    {
      title: "Scientist B - Electronics",
      status: "Under Review",
      updatedOn: "13 Apr 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <ApplicantStats stats={stats} />

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Latest Vacancies
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            My Application Status
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {applications.map((item, index) => (
              <ApplicationStatusCard key={index} application={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}