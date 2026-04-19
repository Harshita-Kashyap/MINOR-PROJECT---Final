import DashboardRibbon from "../../../shared/components/navigation/DashboardRibbon";

const links = [
  { name: "Dashboard", path: "/applicant", end: true },
  { name: "Profile", path: "/applicant/profile" },
  { name: "Vacancies", path: "/applicant/vacancies" },
  { name: "My Applications", path: "/applicant/applications" },
  { name: "Technical Test", path: "/applicant/technical-test" },
  { name: "Personality Test", path: "/applicant/personality-test" },
];

export default function ApplicantRibbon() {
  return <DashboardRibbon links={links} />;
}