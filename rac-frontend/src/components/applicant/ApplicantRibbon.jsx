import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/applicant" },
  { name: "Profile", path: "/applicant/profile" },
  { name: "Vacancies", path: "/applicant/vacancies" },
  { name: "My Applications", path: "/applicant/applications" },
  { name: "Technical Test", path: "/applicant/technical-test" },
  { name: "Personality Test", path: "/applicant/personality-test" },
];

export default function ApplicantRibbon() {
  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/applicant"}
              className={({ isActive }) =>
                `whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}