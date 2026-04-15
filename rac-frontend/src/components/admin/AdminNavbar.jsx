import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "Vacancies", path: "/admin/vacancies" },
  { name: "Applications", path: "/admin/applications" },
  { name: "Results", path: "/admin/results" },
];

function AdminNavbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white shadow">

      {/* 🔥 TOP HEADER */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* LEFT: LOGO + TITLE */}
        <div className="flex items-center gap-4">

          {/* 🟡 DRDO LOGO */}
          <img
            src="/drdo-logo.png"   // 👉 put logo in public folder
            alt="DRDO"
            className="h-12 w-12 object-contain"
          />

          {/* TEXT */}
          <div>
            <h1 className="text-lg font-semibold">
              Recruitment & Assessment Centre (RAC)
            </h1>
            <p className="text-sm text-gray-300">
              DRDO, Government of India
            </p>
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-3">

          {/* LANGUAGE SWITCH */}
          <div className="flex rounded-lg overflow-hidden border border-gray-600">
            <button className="px-3 py-1 text-sm bg-blue-600">EN</button>
            <button className="px-3 py-1 text-sm bg-transparent">हिंदी</button>
          </div>

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-700"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* USER */}
          <div className="px-3 py-1 bg-gray-700 rounded text-sm">
            Admin
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 border border-gray-500 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>

      {/* 🔥 RIBBON NAV (LIKE SELECTOR) */}
      <div className="px-6 pb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `
                whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }
              `
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {link.name}

                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </span>
              )}
            </NavLink>
          ))}

        </div>
      </div>

    </div>
  );
}

export default AdminNavbar;