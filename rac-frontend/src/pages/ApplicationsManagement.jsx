import { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import axios from "axios";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";

  // ✅ Fetch applications
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

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/status`, { id, status });
      fetchApplications();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // 🎨 Status badge
  const getStatusStyle = (status) => {
    switch (status) {
      case "Applied":
        return "bg-gray-200 text-gray-800";
      case "Shortlisted":
        return "bg-yellow-200 text-yellow-800";
      case "Selected":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6 space-y-6">

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Applications Management
        </h2>

        {/* 📋 TABLE */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No applications found
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Job</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-3">{app.name}</td>
                    <td className="p-3">{app.email}</td>
                    <td className="p-3">{app.title}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 text-center space-x-2">

                      <button
                        onClick={() =>
                          updateStatus(app.id, "Shortlisted")
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app.id, "Selected")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Select
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app.id, "Rejected")
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Reject
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

export default ApplicationsManagement;