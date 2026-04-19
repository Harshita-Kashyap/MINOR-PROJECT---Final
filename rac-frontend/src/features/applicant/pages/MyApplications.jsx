import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";

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
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      {/* HEADER */}
      <Header />

      {/* APPLICANT RIBBON */}
      <ApplicantRibbon />

      {/* CONTENT */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
          My Applications
        </h2>

        {/* 🔄 Loading */}
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No applications found
          </p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-xl bg-white p-5 shadow-sm transition-colors dark:bg-gray-800"
              >
                {/* Job Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {app.title}
                </h3>

                {/* Department */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {app.department}
                </p>

                {/* Status */}
                <div className="mt-3">
                  <span
                    className={`rounded-full px-4 py-1 text-sm font-medium ${getStatusStyle(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>

                  {/* EXTRA MESSAGE */}
                  {app.status === "Selected" && (
                    <p className="mt-2 font-semibold text-green-600 dark:text-green-400">
                      🎉 Congratulations! You are selected
                    </p>
                  )}

                  {app.status === "Rejected" && (
                    <p className="mt-2 text-red-500 dark:text-red-400">
                      ❌ Better luck next time
                    </p>
                  )}

                  {app.status === "Applied" && (
                    <p className="mt-2 text-blue-500 dark:text-blue-400">
                      ⏳ Your application is under review
                    </p>
                  )}
                </div>

                {/* Applied Date */}
                <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                  Applied on:{" "}
                  {new Date(app.applied_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyApplications;