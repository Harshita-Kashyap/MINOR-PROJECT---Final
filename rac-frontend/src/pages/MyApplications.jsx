import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const API = "http://localhost:5000/api";

  // 🔥 Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API}/my-applications/${user.userId}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Auto refresh every 3 sec
  useEffect(() => {
    fetchApplications();

    const interval = setInterval(fetchApplications, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🎨 Status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        My Applications
      </h2>

      {/* 🔄 Loading */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No applications found</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow"
            >
              {/* Job Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {app.title}
              </h3>

              {/* Department */}
              <p className="text-sm text-gray-500">
                {app.department}
              </p>

              {/* Status */}
              <div className="mt-3">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>

                {/* 🔥 EXTRA MESSAGE */}
                {app.status === "Selected" && (
                  <p className="text-green-600 font-semibold mt-2">
                    🎉 Congratulations! You are selected
                  </p>
                )}

                {app.status === "Rejected" && (
                  <p className="text-red-500 mt-2">
                    ❌ Better luck next time
                  </p>
                )}

                {app.status === "Applied" && (
                  <p className="text-blue-500 mt-2">
                    ⏳ Your application is under review
                  </p>
                )}
              </div>

              {/* Applied Date */}
              <p className="text-xs text-gray-400 mt-3">
                Applied on:{" "}
                {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;