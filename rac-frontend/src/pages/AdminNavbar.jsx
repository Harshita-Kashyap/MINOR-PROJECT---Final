import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function AdminNavbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle =
    "px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700";

  const activeStyle =
    "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Admin Panel
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-4">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-700 dark:text-gray-200"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/vacancies"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-700 dark:text-gray-200"}`
          }
        >
          Vacancies
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-700 dark:text-gray-200"}`
          }
        >
          Applications
        </NavLink>

        <NavLink
          to="/admin/results"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : "text-gray-700 dark:text-gray-200"}`
          }
        >
          Results
        </NavLink>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;