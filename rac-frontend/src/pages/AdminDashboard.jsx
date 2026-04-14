import AdminNavbar from "../components/admin/AdminNavbar";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    vacancies: 0,
    applications: 0,
    shortlisted: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 🔥 Later connect with backend APIs
    setStats({
      vacancies: 10,
      applications: 45,
      shortlisted: 12,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6 space-y-6">

        {/* 🔥 WELCOME SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold">
            Welcome, {user?.name || "Admin"} 👋
          </h2>
          <p className="mt-1 text-sm opacity-90">
            Manage vacancies, applications, and recruitment process efficiently.
          </p>
        </div>

        {/* 📊 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Vacancies */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 dark:text-gray-400">
              Total Vacancies
            </p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {stats.vacancies}
            </h3>
          </div>

          {/* Applications */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 dark:text-gray-400">
              Applications
            </p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {stats.applications}
            </h3>
          </div>

          {/* Shortlisted */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-500 dark:text-gray-400">
              Shortlisted
            </p>
            <h3 className="text-3xl font-bold text-yellow-500 mt-2">
              {stats.shortlisted}
            </h3>
          </div>

        </div>

        {/* ⚡ QUICK ACTIONS */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">

            <a
              href="/admin/create-vacancy"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Create Vacancy
            </a>

            <a
              href="/admin/vacancies"
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Manage Vacancies
            </a>

            <a
              href="/admin/applications"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              View Applications
            </a>

            <a
              href="/admin/shortlisting"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Shortlist Candidates
            </a>

          </div>
        </div>

        {/* 📋 RECENT ACTIVITY (DUMMY FOR NOW) */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>✅ New vacancy created for Software Engineer</li>
            <li>📥 5 new applications received</li>
            <li>⭐ 2 candidates shortlisted</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;