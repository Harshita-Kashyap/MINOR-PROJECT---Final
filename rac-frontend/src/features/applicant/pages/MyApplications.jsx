import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import { getApplicantApplications } from "../services/applicantService";

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicantApplications();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Error:", err);
        alert(err.message || "Error fetching applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <PageShell>
        <Card className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Loading applications...
          </p>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            My Applications
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track verification, tests, scores, final decision, and complete timeline.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/applicant/vacancies")}
        >
          Browse Vacancies
        </Button>
      </section>

      {applications.length === 0 ? (
        <Card className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            No applications found
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Once you apply for a vacancy, it will appear here.
          </p>

          <div className="mt-5 flex justify-center">
            <Button onClick={() => navigate("/applicant/vacancies")}>
              Explore Vacancies
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationStatusCard
              key={app._id || app.applicationId}
              application={app}
            />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}