import { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";

function FinalMeritList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch merit list
  const fetchMeritList = async () => {
    try {
      setLoading(true);

      // 👉 CHANGE THIS API LATER (when backend ready)
      const res = await fetch("http://localhost:5000/api/merit-list");
      const data = await res.json();

      setCandidates(data);
    } catch (error) {
      console.error("Error fetching merit list:", error);

      // 🔴 TEMP DUMMY DATA (REMOVE LATER)
      setCandidates([
        { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", score: 92 },
        { id: 2, name: "Priya Verma", email: "priya@gmail.com", score: 88 },
        { id: 3, name: "Amit Singh", email: "amit@gmail.com", score: 84 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeritList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6 space-y-6">

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Final Merit List
        </h2>

        {/* 📊 CONTENT */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">

          {loading ? (
            <p className="text-center text-gray-500">
              Loading merit list...
            </p>
          ) : candidates.length === 0 ? (
            <p className="text-center text-gray-500">
              No candidates selected yet
            </p>
          ) : (
            <table className="w-full text-left">

              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Score</th>
                </tr>
              </thead>

              <tbody>
                {candidates
                  .sort((a, b) => b.score - a.score)
                  .map((c, index) => (
                    <tr
                      key={c.id}
                      className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="p-3 font-bold text-blue-600">
                        #{index + 1}
                      </td>

                      <td className="p-3 text-gray-800 dark:text-gray-100">
                        {c.name}
                      </td>

                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {c.email}
                      </td>

                      <td className="p-3 text-green-600 font-semibold">
                        {c.score}
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

export default FinalMeritList;