import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import { getVacancyApplicationProgress } from "../services/vacancyService";

function VacancyProgress() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacancy, setVacancy] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getVacancyApplicationProgress(id);
        setVacancy(res.data?.vacancy || null);
        setProgress(res.data?.progress || {});
      } catch (error) {
        console.error("Vacancy progress error:", error);
        setError("Failed to load vacancy progress");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [id]);

  if (loading || error) {
    return (
      <PageShell>
        <Card>
          <p className={error ? "text-sm text-red-500" : "text-sm text-gray-500"}>
            {error || "Loading vacancy progress..."}
          </p>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Vacancy Progress
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Read-only progress monitoring for this vacancy.
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate("/admin/vacancies")}>
            Back to Vacancies
          </Button>
        </section>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {vacancy?.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {vacancy?.department} • {vacancy?.status}
          </p>
        </Card>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Total Applications" value={progress.totalApplications || 0} />
          <MetricCard title="Verification Eligible" value={progress.verificationEligible || 0} tone="success" />
          <MetricCard title="Technical Qualified" value={progress.technicalQualified || 0} tone="info" />
          <MetricCard title="Selected" value={progress.selected || 0} tone="success" />
        </section>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Workflow Breakdown
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ProgressItem label="Verification Pending" value={progress.verificationPending} />
            <ProgressItem label="Verification Review" value={progress.verificationReview} />
            <ProgressItem label="Verification Rejected" value={progress.verificationRejected} />
            <ProgressItem label="Technical Assigned" value={progress.technicalAssigned} />
            <ProgressItem label="Technical Submitted" value={progress.technicalSubmitted} />
            <ProgressItem label="Technical Rejected" value={progress.technicalRejected} />
            <ProgressItem label="Personality Assigned" value={progress.personalityAssigned} />
            <ProgressItem label="Personality Submitted" value={progress.personalitySubmitted} />
            <ProgressItem label="Final Review" value={progress.finalReview} />
            <ProgressItem label="Waitlisted" value={progress.waitlisted} />
            <ProgressItem label="Final Rejected" value={progress.finalRejected} />
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
  };

  return (
    <Card className={`bg-gradient-to-br ${toneMap[tone || "default"]}`}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
    </Card>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800/60">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value || 0}
      </p>
    </div>
  );
}

export default VacancyProgress;