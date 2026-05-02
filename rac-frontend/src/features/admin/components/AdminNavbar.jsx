import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/admin/dashboard", end: true },
  { name: "Vacancies", path: "/admin/vacancies" },
  { name: "Create Vacancy", path: "/admin/create-vacancy" },
  { name: "Applications", path: "/admin/applications" },
  { name: "Users", path: "/admin/users" },
  { name: "Analytics", path: "/admin/analytics" },
];

function AdminNavbar() {
  return <DashboardRibbon links={links} />;
}

export default AdminNavbar;