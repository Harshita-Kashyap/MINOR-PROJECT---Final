// src/pages/MyApplications.jsx
import { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { getApplications } from "../utils/applicationStorage";

function getBadgeVariant(status) {
  if (status === "Applied") return "info";
  if (status === "Under Review") return "warning";
  if (status === "Technical Test Assigned") return "warning";
  if (status === "Technical Test Completed") return "success";
  if (status === "Personality Test Assigned") return "warning";
  if (status === "Selected") return "success";
  if (status === "Rejected") return "danger";
  return "default";
}

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApplications = getApplications();

    const formattedApplications = storedApplications.map((item) => ({
      vacancy: item.vacancy,
      appliedDate: item.appliedDate,
      stage: <Badge variant={getBadgeVariant(item.stage)}>{item.stage}</Badge>,
      technical: (
        <Badge variant={getBadgeVariant(item.technical)}>{item.technical}</Badge>
      ),
      personality: (
        <Badge variant={getBadgeVariant(item.personality)}>
          {item.personality}
        </Badge>
      ),
      final: <Badge variant={getBadgeVariant(item.final)}>{item.final}</Badge>,
    }));

    setApplications(formattedApplications);
  }, []);

  const columns = [
    "Vacancy",
    "Applied Date",
    "Current Stage",
    "Technical Test",
    "Personality Test",
    "Final Status",
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          My Applications
        </h1>

        <Table columns={columns} data={applications} />
      </main>
    </div>
  );
}