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

  const navigate = useNavigate();

  // ✅ Fetch vacancies
  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const res = await getVacancies();
      setVacancies(res.data);
      setFilteredVacancies(res.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // ✅ Search + Filter logic
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

  // ✅ Delete vacancy
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      try {
        await deleteVacancy(id);
        fetchVacancies();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // ✅ Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

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

        {/* 🔍 SEARCH + FILTER */}
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

        {/* 📊 TABLE */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading vacancies...
            </div>
          ) : filteredVacancies.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No vacancies found
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredVacancies.map((v) => (
                  <tr
                    key={v.id}
                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-100">
                      {v.title}
                    </td>

                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {v.department}
                    </td>

                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {formatDate(v.deadline)}
                    </td>

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

export default VacancyManagement;