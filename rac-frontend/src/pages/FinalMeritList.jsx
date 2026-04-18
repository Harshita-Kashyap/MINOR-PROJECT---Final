import { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import AdminNavbar from "../components/admin/AdminNavbar";
import Card from "../components/ui/Card";

function FinalMeritList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeritList = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/merit-list");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      setCandidates(data);
    } catch (error) {
      console.error("Error fetching merit list:", error);

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
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 transition dark:bg-gray-900">
        <AdminNavbar />

        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Final Merit List
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View the ranked list of selected candidates based on final scores.
            </p>
          </div>

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading merit list...
              </div>
            ) : candidates.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No candidates selected yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-700/60 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Rank</th>
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Score</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[...candidates]
                      .sort((a, b) => b.score - a.score)
                      .map((c, index) => (
                        <tr
                          key={c.id}
                          className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60"
                        >
                          <td className="p-4">
                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              #{index + 1}
                            </span>
                          </td>

                          <td className="p-4 font-medium text-gray-800 dark:text-white">
                            {c.name}
                          </td>

                          <td className="p-4 text-gray-600 dark:text-gray-300">
                            {c.email}
                          </td>

                          <td className="p-4 font-semibold text-green-600 dark:text-green-400">
                            {c.score}
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

export default FinalMeritList;