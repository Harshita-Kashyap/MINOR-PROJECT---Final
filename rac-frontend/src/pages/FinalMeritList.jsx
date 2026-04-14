import { useEffect, useState } from "react";
import API from "../services/api";

function FinalMeritList() {
  const [data, setData] = useState([]);

  // 🔹 Fetch merit list
  const fetchMeritList = async () => {
    try {
      const res = await API.get("/admin/merit-list"); // backend API
      setData(res.data);
    } catch (error) {
      console.error("Error fetching merit list:", error);
    }
  };

  useEffect(() => {
    fetchMeritList();
  }, []);

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">Final Merit List</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Rank</th>
            <th className="p-3">Candidate Name</th>
            <th className="p-3">Vacancy</th>
            <th className="p-3">Final Score</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="border-t text-center">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.vacancy}</td>
                <td className="p-3">{item.score}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-500 text-white rounded">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FinalMeritList;