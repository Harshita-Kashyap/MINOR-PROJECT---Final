import { NavLink } from "react-router-dom";

export default function DashboardRibbon({ links, basePathPadding = "px-6" }) {
  return (
    <div className="w-full border-b border-gray-200 bg-white/90 backdrop-blur transition dark:border-gray-700 dark:bg-gray-800/90">
      <div className={basePathPadding}>
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `group relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {link.name}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-200" />
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