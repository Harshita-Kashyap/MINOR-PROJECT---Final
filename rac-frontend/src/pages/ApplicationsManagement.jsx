import { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import AdminNavbar from "../components/admin/AdminNavbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/status`, { id, status });
      fetchApplications();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Selected":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 transition dark:bg-gray-900">
        <AdminNavbar />

        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Applications Management
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review submitted applications and update their selection status.
            </p>
          </div>

          <Card className="overflow-hidden p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Loading applications...
              </div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No applications found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-700/60 dark:text-gray-200">
                    <tr>
                      <th className="p-4 font-semibold">Candidate</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Job</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60"
                      >
                        <td className="p-4 font-medium text-gray-800 dark:text-white">
                          {app.name}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {app.email}
                        </td>

                        <td className="p-4 text-gray-600 dark:text-gray-300">
                          {app.title}
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap justify-center gap-2">
                            <Button
                              size="sm"
                              className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                              onClick={() =>
                                updateStatus(app.id, "Shortlisted")
                              }
                            >
                              Shortlist
                            </Button>

                            <Button
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                              onClick={() => updateStatus(app.id, "Selected")}
                            >
                              Select
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => updateStatus(app.id, "Rejected")}
                            >
                              Reject
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

export default ApplicationsManagement;