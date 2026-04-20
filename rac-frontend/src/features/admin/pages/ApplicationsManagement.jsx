import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";
import axios from "axios";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:5000/api";

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API}/applications`);
      const data = Array.isArray(res.data) ? res.data : [];
      setApplications(data);
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

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/status`, { id, status });
      fetchApplications();
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update application status");
    }
  };

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    if (search.trim()) {
      data = data.filter(
        (app) =>
          app.name?.toLowerCase().includes(search.toLowerCase()) ||
          app.email?.toLowerCase().includes(search.toLowerCase()) ||
          app.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((app) => app.status === statusFilter);
    }

    return data;
  }, [applications, search, statusFilter]);

  const statusCounts = {
    total: applications.length,
    applied: applications.filter((app) => app.status === "Applied").length,
    shortlisted: applications.filter((app) => app.status === "Shortlisted").length,
    selected: applications.filter((app) => app.status === "Selected").length,
    rejected: applications.filter((app) => app.status === "Rejected").length,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Selected":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Applications Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review applicant submissions, monitor status distribution, and control stage-level outcomes.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              title="Total Applications"
              value={statusCounts.total}
              description="All applications received in the system."
              tone="default"
            />
            <MetricCard
              title="Applied"
              value={statusCounts.applied}
              description="Applications currently in initial state."
              tone="default"
            />
            <MetricCard
              title="Shortlisted"
              value={statusCounts.shortlisted}
              description="Candidates progressed to shortlist stage."
              tone="warning"
            />
            <MetricCard
              title="Selected"
              value={statusCounts.selected}
              description="Applications marked as selected."
              tone="success"
            />
            <MetricCard
              title="Rejected"
              value={statusCounts.rejected}
              description="Applications rejected from the process."
              tone="danger"
            />
          </section>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Search by candidate, email, or vacancy..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              >
                <option value="">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </Card>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
              {error}
            </div>
          )}

          <Card className="overflow-hidden border border-gray-200/80 p-0 shadow-sm dark:border-gray-700/80">
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading applications...
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No applications found for the selected filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                  <thead className="bg-gray-50 text-sm text-gray-700 dark:bg-gray-800/70 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Candidate</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Vacancy</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">System Note</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredApplications.map((app) => {
                      const appId = app.id || app._id;

                      return (
                        <tr
                          key={appId}
                          className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60"
                        >
                          <td className="p-4 font-medium text-gray-800 dark:text-white">
                            {app.name}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {app.email}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {app.title}
                          </td>

                          <td className="p-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                app.status
                              )}`}
                            >
                              {app.status}
                            </span>
                          </td>

                          <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                            {app.note || "No additional note available"}
                          </td>

                          <td className="p-4">
                            <div className="flex flex-wrap justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(appId, "Shortlisted")}
                              >
                                Shortlist
                              </Button>

                              <Button
                                size="sm"
                                onClick={() => updateStatus(appId, "Selected")}
                              >
                                Select
                              </Button>

                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => updateStatus(appId, "Rejected")}
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

export default ApplicationsManagement;