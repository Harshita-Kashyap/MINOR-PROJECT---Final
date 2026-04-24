import { useEffect, useMemo, useState } from "react";
import { getVacancies, deleteVacancy } from "../services/vacancyService";
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
      const data = Array.isArray(res.data) ? res.data : [];
      setVacancies(data);
    } catch (error) {
      console.error("Fetch error:", error);
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
    return new Date(date).toLocaleDateString();
  };

  const isExpired = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const getVacancyStatus = (vacancy) => {
    if (vacancy.status) return vacancy.status.toUpperCase();
    return isExpired(vacancy.deadline) ? "EXPIRED" : "ACTIVE";
  };

  const filteredVacancies = useMemo(() => {
    let data = [...vacancies];

    if (search.trim()) {
      data = data.filter((v) =>
        v.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (departmentFilter) {
      data = data.filter((v) => v.department === departmentFilter);
    }

    if (statusFilter) {
      data = data.filter((v) => getVacancyStatus(v) === statusFilter);
    }

    return data;
  }, [vacancies, search, departmentFilter, statusFilter]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vacancy?"
    );
    if (!confirmDelete) return;

    try {
      await deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v.id !== id && v._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete vacancy");
    }
  };

  const totalCount = vacancies.length;
  const activeCount = vacancies.filter(
    (v) => getVacancyStatus(v) === "ACTIVE" || getVacancyStatus(v) === "OPEN"
  ).length;
  const expiredCount = vacancies.filter(
    (v) => getVacancyStatus(v) === "EXPIRED" || getVacancyStatus(v) === "CLOSED"
  ).length;
  const draftCount = vacancies.filter(
    (v) => getVacancyStatus(v) === "DRAFT"
  ).length;

  const departments = [...new Set(vacancies.map((v) => v.department).filter(Boolean))];

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
                Manage vacancy lifecycle, monitor deadlines, and control recruitment postings.
              </p>
            </div>

            <Button onClick={() => navigate("/admin/create-vacancy")}>
              + Create Vacancy
            </Button>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Vacancies"
              value={totalCount}
              description="All vacancy records in the system."
              tone="default"
            />
            <MetricCard
              title="Active / Open"
              value={activeCount}
              description="Vacancies currently visible to applicants."
              tone="success"
            />
            <MetricCard
              title="Expired / Closed"
              value={expiredCount}
              description="Vacancies no longer accepting applications."
              tone="danger"
            />
            <MetricCard
              title="Draft"
              value={draftCount}
              description="Vacancies not yet ready for publication."
              tone="warning"
            />
          </section>

          <Card className="border border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/75">
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Search by vacancy title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
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
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="OPEN">Open</option>
                <option value="EXPIRED">Expired</option>
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

          <Card className="overflow-hidden border border-gray-200/80 bg-white/95 p-0 shadow-sm backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            {loading ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                Loading vacancies...
              </div>
            ) : filteredVacancies.length === 0 ? (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No vacancies found for the selected filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left">
                  <thead className="bg-gray-100/90 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Title</th>
                      <th className="p-4 font-semibold">Department</th>
                      <th className="p-4 font-semibold">Deadline</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Description</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredVacancies.map((v) => {
                      const id = v.id || v._id;
                      const status = getVacancyStatus(v);

                      return (
                        <tr
                          key={id}
                          className="transition hover:bg-gray-50/80 dark:hover:bg-gray-800/70"
                        >
                          <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                            {v.title}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {v.department || "-"}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {formatDate(v.deadline)}
                          </td>

                          <td className="p-4">
                            <StatusPill status={status} />
                          </td>

                          <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                            <span className="line-clamp-2">
                              {v.description || "No description available"}
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/admin/edit-vacancy/${id}`)}
                              >
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(id)}
                              >
                                Delete
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
    default:
      "from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    success:
      "from-green-50 to-emerald-50 dark:from-emerald-950/30 dark:to-gray-800",
    danger:
      "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-gray-800",
    warning:
      "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700/70 ${
        toneMap[tone || "default"]
      }`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {value}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </Card>
  );
}

function StatusPill({ status }) {
  const map = {
    ACTIVE:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    OPEN:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    EXPIRED:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    CLOSED:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    DRAFT:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
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

export default VacancyManagement;