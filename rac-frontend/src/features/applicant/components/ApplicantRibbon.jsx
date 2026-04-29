import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/applicant/dashboard", end: true },
  { name: "Profile", path: "/applicant/profile" },
  { name: "Vacancies", path: "/applicant/vacancies" },
  { name: "My Applications", path: "/applicant/applications" },
];

export default function ApplicantRibbon() {
  return <DashboardRibbon links={links} />;
}