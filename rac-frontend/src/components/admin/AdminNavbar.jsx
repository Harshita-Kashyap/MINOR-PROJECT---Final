import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

function AdminNavbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow">
      
      {/* LEFT */}
      <h1 className="text-lg font-bold text-gray-800 dark:text-white">
        Admin Panel
      </h1>

      {/* CENTER MENU */}
      <div className="flex gap-4">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/vacancies" className={linkClass}>
          Vacancies
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

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;