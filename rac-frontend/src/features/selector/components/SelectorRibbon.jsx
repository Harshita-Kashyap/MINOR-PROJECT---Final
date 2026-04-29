import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/selector/dashboard", end: true },
  { name: "Candidates", path: "/selector/candidates" },
  { name: "Schedule Test", path: "/selector/schedule-technical-test" },
  { name: "Analytics", path: "/selector/analytics" },
  { name: "Evaluation", path: "/selector/evaluation" },
];

export default function SelectorRibbon() {
  return <DashboardRibbon links={links} />;
}