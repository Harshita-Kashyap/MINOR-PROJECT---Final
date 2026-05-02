import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/selector/dashboard", end: true },
  { name: "Candidates", path: "/selector/candidates" },
  { name: "Schedule Tests", path: "/selector/schedule-technical-test" },
  { name: "Technical Results", path: "/selector/technical-results" },
  { name: "Final Evaluation", path: "/selector/evaluation" },
  { name: "Analytics", path: "/selector/analytics" },
];

export default function SelectorRibbon() {
  return <DashboardRibbon links={links} />;
}