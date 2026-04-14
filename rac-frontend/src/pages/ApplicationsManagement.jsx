import { useEffect, useState } from "react";
import API from "../services/api";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);

  // 🔹 Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications"); // backend API needed
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">
        Applications Management
      </h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Applicant Name</th>
            <th className="p-3">Vacancy</th>
            <th className="p-3">Status</th>
            <th className="p-3">Score</th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No applications found
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id} className="border-t text-center">
                <td className="p-3">{app.applicant_name}</td>
                <td className="p-3">{app.vacancy_title}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-300 rounded">
                    {app.status}
                  </span>
                </td>
                <td className="p-3">{app.score || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsManagement;