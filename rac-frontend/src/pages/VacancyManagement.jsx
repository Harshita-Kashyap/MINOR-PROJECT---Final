import { useEffect, useState } from "react";
import { getVacancies, deleteVacancy } from "../services/vacancyService";
import { useNavigate } from "react-router-dom";

function VacancyManagement() {
  const [vacancies, setVacancies] = useState([]);
  const navigate = useNavigate();

  // Fetch vacancies
  const fetchVacancies = async () => {
    try {
      const res = await getVacancies();
      setVacancies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteVacancy(id);
      fetchVacancies();
    }
  };

  return (
    <div className="p-6 ml-64">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Vacancy Management</h2>

        <button
          onClick={() => navigate("/admin/create-vacancy")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Vacancy
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Department</th>
            <th className="p-3">Deadline</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vacancies.map((v) => (
            <tr key={v.id} className="border-t text-center">
              <td className="p-3">{v.title}</td>
              <td className="p-3">{v.department}</td>
              <td className="p-3">{v.deadline}</td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/admin/edit-vacancy/${v.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(v.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VacancyManagement;