import { useEffect, useState } from "react";
import API from "../services/api";

function Shortlisting() {
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState("");

  // 🔹 Fetch vacancies
  const fetchVacancies = async () => {
    try {
      const res = await API.get("/vacancies");
      setVacancies(res.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  // 🔹 Handle shortlist
  const handleShortlist = async () => {
    if (!selectedVacancy) {
      alert("Please select a vacancy");
      return;
    }

    try {
      await API.post(`/evaluation/shortlist/${selectedVacancy}`);
      alert("✅ Shortlisting completed");
    } catch (error) {
      console.error("Shortlisting error:", error);
      alert("❌ Failed to shortlist");
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">Shortlisting</h2>

      <div className="bg-white p-4 shadow rounded space-y-4">

        {/* Vacancy Dropdown */}
        <select
          className="w-full p-2 border rounded"
          value={selectedVacancy}
          onChange={(e) => setSelectedVacancy(e.target.value)}
        >
          <option value="">Select Vacancy</option>
          {vacancies.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleShortlist}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Shortlist
        </button>

      </div>
    </div>
  );
}

export default Shortlisting;