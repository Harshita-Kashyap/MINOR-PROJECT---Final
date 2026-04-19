import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/selector", end: true },
  { name: "Candidates", path: "/selector/candidates" },
  { name: "Analytics", path: "/selector/analytics" },
  { name: "Evaluation", path: "/selector/evaluation/1" },
];

export default function SelectorRibbon() {
  return <DashboardRibbon links={links} />;
}