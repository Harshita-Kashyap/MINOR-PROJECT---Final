import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplicantDashboard() {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Krishna Sharma",
    email: "krishna@gmail.com",
  });

  const stats = [
    { title: "Total Applications", value: 12 },
    { title: "Shortlisted", value: 5 },
    { title: "Rejected", value: 3 },
    { title: "Pending", value: 4 },
  ];

  const recentApplications = [
    { id: 1, post: "Scientist B", status: "Pending" },
    { id: 2, post: "Research Intern", status: "Shortlisted" },
    { id: 3, post: "Project Assistant", status: "Rejected" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-500">
            Manage your applications and track status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow rounded p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/applications")}
            >
              <h3 className="text-gray-500 text-sm">
                {item.title}
              </h3>
              <p className="text-xl font-bold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">
            Recent Applications
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm">
                <th className="py-2">Post</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/applications/${app.id}`)}
                >
                  <td className="py-2">{app.post}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        app.status === "Pending"
                          ? "bg-yellow-500"
                          : app.status === "Shortlisted"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-3">
            Quick Actions
          </h2>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/apply")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Apply for New Post
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              View Profile
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default ApplicantDashboard;