import { useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";

function Shortlisting() {
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const candidates = [
    {
      id: 1,
      name: "Aman Sharma",
      vacancy: "Scientist B - Computer Science",
      profileScore: 85,
      verification: "Eligible",
      stage: "Verification Complete",
      shortlistStatus: "Pending",
    },
    {
      id: 2,
      name: "Priya Verma",
      vacancy: "Scientist B - Mechanical",
      profileScore: 78,
      verification: "Eligible",
      stage: "Technical Assigned",
      shortlistStatus: "Shortlisted",
    },
    {
      id: 3,
      name: "Rohit Meena",
      vacancy: "Scientist B - Electronics",
      profileScore: 62,
      verification: "Review",
      stage: "Verification Review",
      shortlistStatus: "Pending",
    },
    {
      id: 4,
      name: "Neha Singh",
      vacancy: "Scientist B - Computer Science",
      profileScore: 48,
      verification: "Rejected",
      stage: "Verification Rejected",
      shortlistStatus: "Rejected",
    },
  ];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesVacancy =
        vacancyFilter === "All" || candidate.vacancy === vacancyFilter;

      const matchesStatus =
        statusFilter === "All" || candidate.shortlistStatus === statusFilter;

      return matchesVacancy && matchesStatus;
    });
  }, [vacancyFilter, statusFilter]);

  const vacancies = ["All", ...new Set(candidates.map((c) => c.vacancy))];

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => c.shortlistStatus === "Pending").length,
    shortlisted: candidates.filter((c) => c.shortlistStatus === "Shortlisted")
      .length,
    rejected: candidates.filter((c) => c.shortlistStatus === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Shortlisting Control
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review eligible candidates, inspect profile merit status, and control who moves to the next stage.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Candidates"
              value={stats.total}
              description="Candidates available in the current shortlist pool."
              tone="default"
            />
            <MetricCard
              title="Pending Review"
              value={stats.pending}
              description="Candidates waiting for shortlist decision."
              tone="warning"
            />
            <MetricCard
              title="Shortlisted"
              value={stats.shortlisted}
              description="Candidates approved to move ahead."
              tone="success"
            />
            <MetricCard
              title="Rejected"
              value={stats.rejected}
              description="Candidates blocked from further progression."
              tone="danger"
            />
          </section>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="grid gap-4 md:grid-cols-3">
              <select
                value={vacancyFilter}
                onChange={(e) => setVacancyFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              >
                {vacancies.map((vacancy) => (
                  <option key={vacancy} value={vacancy}>
                    {vacancy}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-300">
                Admin can preview and confirm shortlist progression here.
              </div>
            </div>
          </Card>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="mb-5 flex items-end justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Candidate Shortlisting Queue
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Use this queue to validate which candidates should proceed to the next process stage.
                </p>
              </div>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
                No candidates found for the selected filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                  <thead className="bg-gray-50 text-sm text-gray-700 dark:bg-gray-800/70 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Candidate</th>
                      <th className="p-4 font-semibold">Vacancy</th>
                      <th className="p-4 font-semibold">Profile Score</th>
                      <th className="p-4 font-semibold">Verification</th>
                      <th className="p-4 font-semibold">Current Stage</th>
                      <th className="p-4 font-semibold">Shortlist Status</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60"
                      >
                        <td className="p-4 font-medium text-gray-800 dark:text-white">
                          {candidate.name}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {candidate.vacancy}
                        </td>

                        <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                          {candidate.profileScore}
                        </td>

                        <td className="p-4">
                          <StatusPill
                            status={candidate.verification}
                            type="verification"
                          />
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {candidate.stage}
                        </td>

                        <td className="p-4">
                          <StatusPill
                            status={candidate.shortlistStatus}
                            type="shortlist"
                          />
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap justify-center gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>

                            <Button size="sm">
                              Shortlist
                            </Button>

                            <Button size="sm" variant="danger">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="grid gap-4 md:grid-cols-3">
              <InfoBox
                title="How this page works"
                description="Admin validates shortlist pools and controls candidate movement to subsequent stages."
              />
              <InfoBox
                title="System alignment"
                description="Shortlisting should remain consistent with vacancy rules, profile verification, and test progression."
              />
              <InfoBox
                title="Next logical step"
                description="After shortlist approval, candidates are progressed to tests or prepared for final review."
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, description, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/80 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {value}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}

function StatusPill({ status, type }) {
  const shortlistMap = {
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    Shortlisted:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  const verificationMap = {
    Eligible:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    Review:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  const map = type === "verification" ? verificationMap : shortlistMap;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        map[status] ||
        "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

function InfoBox({ title, description }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}

export default Shortlisting;