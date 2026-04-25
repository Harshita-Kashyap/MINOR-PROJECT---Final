import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import {
  getAllApplications,
  updateApplicationVerification,
  updateFinalResult,
} from "../services/vacancyService";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllApplications();
      setApplications(res.data?.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getCandidateName = (app) =>
    app.profileId?.fullName || app.userId?.name || "Candidate";

  const getCandidateEmail = (app) =>
    app.userId?.email || app.profileId?.email || "-";

  const getVacancyTitle = (app) =>
    app.vacancyId?.title || app.vacancyTitle || "-";

  const getDisplayStatus = (app) => {
    if (app.finalStatus === "SELECTED") return "Selected";
    if (app.finalStatus === "REJECTED") return "Rejected";
    if (app.technicalTestStatus === "SHORTLISTED") return "Shortlisted";
    if (app.verificationStatus === "ELIGIBLE") return "Eligible";
    if (app.verificationStatus === "REJECTED") return "Rejected";
    return "Applied";
  };

  const markEligible = async (id) => {
    await updateApplicationVerification(id, {
      verificationStatus: "ELIGIBLE",
      verificationReason: "Candidate verified as eligible.",
    });
    fetchApplications();
  };

  const rejectVerification = async (id) => {
    await updateApplicationVerification(id, {
      verificationStatus: "REJECTED",
      verificationReason: "Candidate does not meet eligibility criteria.",
    });
    fetchApplications();
  };

  const selectCandidate = async (app) => {
    await updateFinalResult(app._id, {
      personalityScore: app.personalityScore || 70,
      finalStatus: "SELECTED",
      finalRemarks: "Candidate selected after final review.",
    });
    fetchApplications();
  };

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    if (search.trim()) {
      const term = search.toLowerCase();

      data = data.filter(
        (app) =>
          getCandidateName(app).toLowerCase().includes(term) ||
          getCandidateEmail(app).toLowerCase().includes(term) ||
          getVacancyTitle(app).toLowerCase().includes(term)
      );
    }

    if (statusFilter) {
      data = data.filter((app) => getDisplayStatus(app) === statusFilter);
    }

    return data;
  }, [applications, search, statusFilter]);

  const statusCounts = {
    total: applications.length,
    applied: applications.filter((app) => getDisplayStatus(app) === "Applied")
      .length,
    shortlisted: applications.filter(
      (app) => getDisplayStatus(app) === "Shortlisted"
    ).length,
    selected: applications.filter((app) => getDisplayStatus(app) === "Selected")
      .length,
    rejected: applications.filter((app) => getDisplayStatus(app) === "Rejected")
      .length,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-200";
      case "Eligible":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Selected":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Applications Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review applications, verify eligibility, shortlist candidates, and update final outcomes.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard title="Total" value={statusCounts.total} tone="default" />
            <MetricCard title="Applied" value={statusCounts.applied} tone="default" />
            <MetricCard title="Shortlisted" value={statusCounts.shortlisted} tone="warning" />
            <MetricCard title="Selected" value={statusCounts.selected} tone="success" />
            <MetricCard title="Rejected" value={statusCounts.rejected} tone="danger" />
          </section>

          <Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Search candidate, email, or vacancy..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Eligible">Eligible</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </Card>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading applications...
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No applications found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1150px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Vacancy</th>
                      <th className="p-4">Verification</th>
                      <th className="p-4">Technical</th>
                      <th className="p-4">Final</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredApplications.map((app) => {
                      const status = getDisplayStatus(app);

                      return (
                        <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                            {getCandidateName(app)}
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {getCandidateEmail(app)}
                          </td>
                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {getVacancyTitle(app)}
                          </td>
                          <td className="p-4">{app.verificationStatus}</td>
                          <td className="p-4">{app.technicalTestStatus}</td>
                          <td className="p-4">{app.finalStatus}</td>
                          <td className="p-4">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(status)}`}>
                              {status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap justify-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => markEligible(app._id)}>
                                Eligible
                              </Button>
                              <Button size="sm" onClick={() => selectCandidate(app)}>
                                Select
                              </Button>
                              <Button size="sm" variant="danger" onClick={() => rejectVerification(app._id)}>
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

export default ApplicationsManagement;