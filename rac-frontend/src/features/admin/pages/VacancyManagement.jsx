import { useEffect, useMemo, useState } from "react";
import {
  getVacancies,
  deleteVacancy,
  publishVacancy,
  closeVacancy,
} from "../services/vacancyService";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Header from "../../landing/components/Header";
import Button from "../../../shared/components/ui/Button";
import Card from "../../../shared/components/ui/Card";
import Input from "../../../shared/components/ui/Input";

function VacancyManagement() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getVacancies();
      setVacancies(Array.isArray(res.data?.vacancies) ? res.data.vacancies : []);
    } catch (error) {
      console.error("Fetch vacancy error:", error);
      setError("Failed to load vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB");
  };

  const filteredVacancies = useMemo(() => {
    let data = [...vacancies];

    if (search.trim()) {
      const keyword = search.toLowerCase();
      data = data.filter(
        (v) =>
          v.title?.toLowerCase().includes(keyword) ||
          v.department?.toLowerCase().includes(keyword) ||
          v.advertisementNo?.toLowerCase().includes(keyword)
      );
    }

    if (departmentFilter) {
      data = data.filter((v) => v.department === departmentFilter);
    }

    if (statusFilter) {
      data = data.filter((v) => v.status === statusFilter);
    }

    return data;
  }, [vacancies, search, departmentFilter, statusFilter]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this vacancy only if no applications are linked. If applications exist, close the vacancy instead."
    );

    if (!confirmDelete) return;

    try {
      await deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Delete vacancy error:", error);
      alert(error.response?.data?.message || "Failed to delete vacancy");
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await publishVacancy(id);
      const updated = res.data?.vacancy;

      setVacancies((prev) =>
        prev.map((v) => (v._id === id ? updated : v))
      );
    } catch (error) {
      console.error("Publish vacancy error:", error);
      alert("Failed to publish vacancy");
    }
  };

  const handleClose = async (id) => {
    try {
      const res = await closeVacancy(id);
      const updated = res.data?.vacancy;

      setVacancies((prev) =>
        prev.map((v) => (v._id === id ? updated : v))
      );
    } catch (error) {
      console.error("Close vacancy error:", error);
      alert("Failed to close vacancy");
    }
  };

  const totalCount = vacancies.length;
  const openCount = vacancies.filter((v) => v.status === "OPEN").length;
  const closedCount = vacancies.filter((v) => v.status === "CLOSED").length;
  const draftCount = vacancies.filter((v) => v.status === "DRAFT").length;

  const departments = [
    ...new Set(vacancies.map((v) => v.department).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Vacancy Management
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create, edit, delete, publish, close, and monitor vacancy postings.
              </p>
            </div>

            <Button onClick={() => navigate("/admin/create-vacancy")}>
              + Create Vacancy
            </Button>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Vacancies" value={totalCount} tone="default" />
            <MetricCard title="Open" value={openCount} tone="success" />
            <MetricCard title="Closed" value={closedCount} tone="danger" />
            <MetricCard title="Draft" value={draftCount} tone="warning" />
          </section>

          <Card className="border border-gray-200/80 bg-white/90 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/75">
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Search title, department, advertisement no..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">All Departments</option>
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </Card>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}

          <Card className="overflow-hidden border border-gray-200/80 bg-white/95 p-0 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            {loading ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                Loading vacancies...
              </div>
            ) : filteredVacancies.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No vacancies found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                  <thead className="bg-gray-100/90 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Title</th>
                      <th className="p-4 font-semibold">Advertisement</th>
                      <th className="p-4 font-semibold">Department</th>
                      <th className="p-4 font-semibold">Deadline</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredVacancies.map((v) => (
                      <tr
                        key={v._id}
                        className="transition hover:bg-gray-50/80 dark:hover:bg-gray-800/70"
                      >
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                          {v.title}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {v.advertisementNo || "-"}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {v.department || "-"}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {formatDate(v.deadline)}
                        </td>

                        <td className="p-4">
                          <StatusPill status={v.status} />
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/admin/edit-vacancy/${v._id}`)}
                            >
                              Edit
                            </Button>

                            {v.status !== "OPEN" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handlePublish(v._id)}
                              >
                                Publish
                              </Button>
                            )}

                            {v.status === "OPEN" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleClose(v._id)}
                              >
                                Close
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/admin/vacancies/${v._id}/progress`)}
                            >
                              Progress
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(v._id)}
                            >
                              Delete
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
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, tone }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    success: "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-gray-800",
    warning: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm dark:border-gray-700/70 ${
        toneMap[tone || "default"]
      }`}
    >
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
    OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    CLOSED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    DRAFT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        map[status] ||
        "bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300"
      }`}
    >
      {status || "DRAFT"}
    </span>
  );
}

export default VacancyManagement;