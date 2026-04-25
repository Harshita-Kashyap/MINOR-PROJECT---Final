import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import {
  getAllApplications,
  updateTechnicalResult,
} from "../services/vacancyService";

function Shortlisting() {
  const [applications, setApplications] = useState([]);
  const [vacancyFilter, setVacancyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getAllApplications();
      setApplications(res.data?.applications || []);
    } catch (error) {
      console.error("Shortlisting fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getName = (app) =>
    app.profileId?.fullName || app.userId?.name || "Candidate";

  const getVacancy = (app) =>
    app.vacancyId?.title || app.vacancyTitle || "Unknown Vacancy";

  const getShortlistStatus = (app) => {
    if (app.technicalTestStatus === "SHORTLISTED") return "Shortlisted";
    if (app.technicalTestStatus === "REJECTED") return "Rejected";
    return "Pending";
  };

  const handleShortlist = async (app) => {
    await updateTechnicalResult(app._id, {
      technicalScore: app.technicalScore || 75,
      technicalRemarks: "Candidate shortlisted for personality stage.",
    });
    fetchApplications();
  };

  const handleReject = async (app) => {
    await updateTechnicalResult(app._id, {
      technicalScore: 0,
      technicalRemarks: "Candidate rejected during shortlisting.",
    });
    fetchApplications();
  };

  const candidates = applications.filter(
    (app) =>
      app.verificationStatus === "ELIGIBLE" ||
      app.technicalTestStatus === "SHORTLISTED" ||
      app.technicalTestStatus === "REJECTED"
  );

  const vacancies = ["All", ...new Set(candidates.map((c) => getVacancy(c)))];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesVacancy =
        vacancyFilter === "All" || getVacancy(candidate) === vacancyFilter;

      const matchesStatus =
        statusFilter === "All" ||
        getShortlistStatus(candidate) === statusFilter;

      return matchesVacancy && matchesStatus;
    });
  }, [candidates, vacancyFilter, statusFilter]);

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => getShortlistStatus(c) === "Pending")
      .length,
    shortlisted: candidates.filter(
      (c) => getShortlistStatus(c) === "Shortlisted"
    ).length,
    rejected: candidates.filter((c) => getShortlistStatus(c) === "Rejected")
      .length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Shortlisting Control
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review eligible candidates and move them to the personality stage.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Candidates" value={stats.total} tone="default" />
            <MetricCard title="Pending Review" value={stats.pending} tone="warning" />
            <MetricCard title="Shortlisted" value={stats.shortlisted} tone="success" />
            <MetricCard title="Rejected" value={stats.rejected} tone="danger" />
          </section>

          <Card>
            <div className="grid gap-4 md:grid-cols-3">
              <select
                value={vacancyFilter}
                onChange={(e) => setVacancyFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
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
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
                Only eligible candidates appear in this queue.
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading candidates...
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No candidates found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Vacancy</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Technical Score</th>
                      <th className="p-4">Current Stage</th>
                      <th className="p-4">Shortlist Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredCandidates.map((candidate) => {
                      const status = getShortlistStatus(candidate);

                      return (
                        <tr
                          key={candidate._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                            {getName(candidate)}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {getVacancy(candidate)}
                          </td>

                          <td className="p-4">
                            <StatusPill status={candidate.verificationStatus} />
                          </td>

                          <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                            {candidate.technicalScore ?? "-"}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {candidate.currentStage}
                          </td>

                          <td className="p-4">
                            <StatusPill status={status} />
                          </td>

                          <td className="p-4">
                            <div className="flex flex-wrap justify-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleShortlist(candidate)}
                                disabled={status === "Shortlisted"}
                              >
                                Shortlist
                              </Button>

                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleReject(candidate)}
                                disabled={status === "Rejected"}
                              >
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-gray-800",
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

function StatusPill({ status }) {
  const map = {
    ELIGIBLE:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    REVIEW:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    REJECTED:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    Shortlisted:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    Pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    Rejected:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        map[status] ||
        "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

export default Shortlisting;