import { NavLink } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // 🎯 Role-based menus (UPDATED)
  const menuConfig = {
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Vacancies", path: "/admin/vacancies" },
      { name: "Applications", path: "/admin/applications" },
      { name: "Shortlisting", path: "/admin/shortlisting" },
      { name: "Analytics", path: "/admin/analytics" },
      { name: "Merit List", path: "/admin/merit-list" },
    ],

    applicant: [
      { name: "Dashboard", path: "/applicant" },
      { name: "Profile", path: "/applicant/profile" },
      { name: "Apply Jobs", path: "/applicant/apply" },
      { name: "Application Status", path: "/applicant/status" },
    ],

    selector: [
      { name: "Dashboard", path: "/selector" },
      { name: "Candidates", path: "/selector/candidates" },
      { name: "Evaluation", path: "/selector/evaluation" },
      { name: "Analytics", path: "/selector/analytics" },
    ],
  };

  const menuItems = menuConfig[role] || [];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col">
      
      {/* 🔷 Logo / Title */}
      <div className="p-4 text-xl font-bold border-b border-gray-700 text-center">
        RAC DRDO
      </div>

      {/* 🔷 Menu */}
      <ul className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* 🔷 Footer (User Info) */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        Logged in as: <span className="text-white">{role}</span>
      </div>
    </div>
  );
}

export default Sidebar;