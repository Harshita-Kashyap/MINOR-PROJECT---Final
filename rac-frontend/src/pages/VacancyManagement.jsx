import { useEffect, useState } from "react";
import { getVacancies, deleteVacancy } from "../services/vacancyService";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

function VacancyManagement() {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= FETCH =================
  const fetchVacancies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getVacancies();

      setVacancies(res.data);
      setFilteredVacancies(res.data);

    } catch (error) {
      console.error("Fetch error:", error);
      setError("❌ Failed to load vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // ================= FILTER =================
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

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteVacancy(id);

      // 🔥 instant UI update (no reload)
      setVacancies((prev) => prev.filter((v) => v.id !== id));

    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete vacancy");
    }
  };

  // ================= HELPERS =================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const isExpired = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const activeCount = vacancies.filter((v) => !isExpired(v.deadline)).length;
  const expiredCount = vacancies.filter((v) => isExpired(v.deadline)).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6 space-y-6">

        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Vacancy Management
          </h2>

          <button
            onClick={() => navigate("/admin/create-vacancy")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
          >
            + Add Vacancy
          </button>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total" value={vacancies.length} />
          <StatCard title="Active" value={activeCount} color="green" />
          <StatCard title="Expired" value={expiredCount} color="red" />
        </div>

        {/* 🔍 FILTER */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 rounded border dark:bg-gray-900 dark:text-white"
          />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="p-2 rounded border dark:bg-gray-900 dark:text-white"
          >
            <option value="">All Departments</option>
            {[...new Set(vacancies.map((v) => v.department))].map((dep) => (
              <option key={dep}>{dep}</option>
            ))}
          </select>
        </div>

        {/* ❌ ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        {/* 📋 TABLE */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              ⏳ Loading vacancies...
            </div>
          ) : filteredVacancies.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              🚫 No vacancies found
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVacancies.map((v) => (
                  <tr
                    key={v.id}
                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3 font-medium">{v.title}</td>
                    <td className="p-3">{v.department}</td>
                    <td className="p-3">{formatDate(v.deadline)}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      {isExpired(v.deadline) ? (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                          Expired
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                          Active
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-vacancy/${v.id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(v.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

// ================= STAT CARD =================
const StatCard = ({ title, value, color }) => {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className={`text-xl font-bold ${colorMap[color] || ""}`}>
        {value}
      </h3>
    </div>
  );
};

export default VacancyManagement;