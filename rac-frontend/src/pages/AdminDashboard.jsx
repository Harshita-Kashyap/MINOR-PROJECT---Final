import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/landing/Header";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    vacancies: 0,
    applications: 0,
    shortlisted: 0,
  });

  const user = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    setStats({
      vacancies: 10,
      applications: 45,
      shortlisted: 12,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Header />
      <AdminNavbar />

      <main className="p-6 space-y-6">
        {/* Welcome Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow">
          <h2 className="text-2xl font-bold">
            Welcome, {user?.name || "Admin"} 👋
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Manage vacancies, applications, and recruitment workflows from one place.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Vacancies
            </p>
            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              {stats.vacancies}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Applications
            </p>
            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {stats.applications}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Shortlisted
            </p>
            <h3 className="mt-2 text-3xl font-bold text-amber-500">
              {stats.shortlisted}
            </h3>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/create-vacancy"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              + Create Vacancy
            </Link>

            <Link
              to="/admin/vacancies"
              className="rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Manage Vacancies
            </Link>

            <Link
              to="/admin/applications"
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              View Applications
            </Link>

            <Link
              to="/admin/shortlisting"
              className="rounded-lg bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
            >
              Shortlist Candidates
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>✅ New vacancy created for Software Engineer</li>
            <li>📥 5 new applications received</li>
            <li>⭐ 2 candidates shortlisted</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;