import { NavLink } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // 🎯 Role-based menus
  const menuConfig = {
    admin: [
      { name: "Dashboard", path: "/admin" },
      { name: "Applicants", path: "/admin/applicants" },
      { name: "Vacancies", path: "/admin/vacancies" },
      { name: "Results", path: "/admin/results" },
    ],

    applicant: [
      { name: "Dashboard", path: "/applicant" },
      { name: "Profile", path: "/applicant/profile" },
      { name: "Apply", path: "/applicant/apply" },
      { name: "Status", path: "/applicant/status" },
    ],

    selector: [
      { name: "Dashboard", path: "/selector" },
      { name: "Candidates", path: "/selector/candidates" },
      { name: "Scores", path: "/selector/scores" },
    ],
  };

  const menuItems = menuConfig[role] || [];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        RAC DRDO
      </div>

      <ul className="p-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive
                    ? "bg-gray-700 font-semibold"
                    : "hover:bg-gray-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;