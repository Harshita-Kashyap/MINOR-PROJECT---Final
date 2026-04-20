import { useEffect, useState } from "react";
import { getVacancies, deleteVacancy } from "../services/vacancyService";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import Header from "../components/landing/Header";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

function VacancyManagement() {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getVacancies();
      setVacancies(res.data);
      setFilteredVacancies(res.data);
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

  useEffect(() => {
    let data = [...vacancies];

    if (search) {
      data = data.filter((v) =>
        v.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (departmentFilter) {
      data = data.filter((v) => v.department === departmentFilter);
    }

    setFilteredVacancies(data);
  }, [search, departmentFilter, vacancies]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete vacancy");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const isExpired = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const activeCount = vacancies.filter((v) => !isExpired(v.deadline)).length;
  const expiredCount = vacancies.filter((v) => isExpired(v.deadline)).length;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 transition dark:bg-gray-900">
        <AdminNavbar />

        <div className="space-y-6 p-6">
          {/* PAGE HEADER */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Vacancy Management
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage vacancy listings, deadlines, and department-wise postings.
              </p>
            </div>

            <Button onClick={() => navigate("/admin/create-vacancy")}>
              + Add Vacancy
            </Button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard title="Total" value={vacancies.length} />
            <StatCard title="Active" value={activeCount} color="green" />
            <StatCard title="Expired" value={expiredCount} color="red" />
          </div>

          {/* FILTERS */}
          <Card className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option value="">All Departments</option>
                {[...new Set(vacancies.map((v) => v.department))].map((dep) => (
                  <option key={dep}>{dep}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* ERROR */}
          {error && (
            <div className="rounded-xl bg-red-100 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          {/* TABLE */}
          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading vacancies...
              </div>
            ) : filteredVacancies.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No vacancies found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-700/60 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Title</th>
                      <th className="p-4 font-semibold">Department</th>
                      <th className="p-4 font-semibold">Deadline</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredVacancies.map((v) => (
                      <tr
                        key={v.id}
                        className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60"
                      >
                        <td className="p-4 font-medium text-gray-800 dark:text-white">
                          {v.title}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {v.department}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {formatDate(v.deadline)}
                        </td>

                        <td className="p-4">
                          {isExpired(v.deadline) ? (
                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-300">
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-300">
                              Active
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700"
                              onClick={() => navigate(`/admin/edit-vacancy/${v.id}`)}
                            >
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDelete(v.id)}
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
      </div>
    </>
  );
}

const StatCard = ({ title, value, color }) => {
  const colorMap = {
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400",
  };

  return (
    <Card className="p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className={`mt-1 text-2xl font-bold text-gray-800 dark:text-white ${colorMap[color] || ""}`}>
        {value}
      </h3>
    </Card>
  );
};

export default VacancyManagement;