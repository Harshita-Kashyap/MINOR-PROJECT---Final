import { NavLink } from "react-router-dom";

function AdminNavbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-wrap items-center gap-3">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/vacancies" className={linkClass}>
          Vacancies
        </NavLink>

        <NavLink to="/admin/create-vacancy" className={linkClass}>
          Create Vacancy
        </NavLink>

        <NavLink to="/admin/applications" className={linkClass}>
          Applications
        </NavLink>

        <NavLink to="/admin/shortlisting" className={linkClass}>
          Shortlisting
        </NavLink>

        <NavLink to="/admin/results" className={linkClass}>
          Results
        </NavLink>
      </div>
    </nav>
  );
}

export default AdminNavbar;