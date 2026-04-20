import { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    applicationsPerDay: 0,
    successRate: 0,
    activeVacancies: 0,
  });

  useEffect(() => {
    // 🔥 Replace later with API
    setAnalytics({
      totalUsers: 120,
      applicationsPerDay: 18,
      successRate: 27,
      activeVacancies: 8,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Header />
      <AdminNavbar />

      <main className="p-6 space-y-6">

        {/* PAGE TITLE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Analytics
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitor system performance, recruitment insights, and trends.
          </p>
        </div>

        {/* 📊 METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Users
            </p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {analytics.totalUsers}
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Applications / Day
            </p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {analytics.applicationsPerDay}
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selection Rate
            </p>
            <h3 className="text-3xl font-bold text-yellow-500 mt-2">
              {analytics.successRate}%
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Vacancies
            </p>
            <h3 className="text-3xl font-bold text-indigo-600 mt-2">
              {analytics.activeVacancies}
            </h3>
          </div>

        </div>

        {/* 📈 GRAPH PLACEHOLDER */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Application Trends
          </h3>

          <div className="h-48 flex items-center justify-center text-gray-400">
            📊 Graph coming soon (Chart.js / Recharts)
          </div>
        </div>

        {/* 📋 INSIGHTS */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Insights
          </h3>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>📈 Applications increased by 12% this week</li>
            <li>🎯 Highest success rate in Software roles</li>
            <li>⚠️ Drop in applications for Mechanical domain</li>
          </ul>
        </div>

      </main>
    </div>
  );
}

export default AdminAnalytics;