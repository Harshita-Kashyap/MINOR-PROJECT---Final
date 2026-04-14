// src/pages/ApplicantVacancyDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { applyToVacancy, hasApplied } from "../utils/applicationStorage";
import { isProfileComplete } from "../utils/profileStorage";

const vacancies = [
  {
    id: "1",
    title: "Scientist B - Computer Science",
    department: "DRDO RAC",
    deadline: "20 Apr 2026",
    status: "Open",
    location: "New Delhi",
    eligibility: "B.Tech / M.Tech in Computer Science or related field",
    experience: "Freshers can apply",
    description:
      "The role involves software development, system design, research support, and technical problem solving for defence-related applications.",
  },
  {
    id: "2",
    title: "Scientist B - Mechanical",
    department: "DRDO RAC",
    deadline: "25 Apr 2026",
    status: "Open",
    location: "Hyderabad",
    eligibility: "B.Tech / M.Tech in Mechanical Engineering",
    experience: "0-2 years preferred",
    description:
      "The role focuses on design, testing, manufacturing support, and analysis of mechanical systems for research projects.",
  },
];

export default function ApplicantVacancyDetails() {
  const { id } = useParams();
  const vacancy = vacancies.find((item) => item.id === id);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (vacancy) {
      setApplied(hasApplied(vacancy.id));
    }
  }, [vacancy]);

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <ApplicantRibbon />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <Card>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Vacancy not found
            </h1>
          </Card>
        </main>
      </div>
    );
  }

  const handleApply = () => {
    if (!isProfileComplete()) {
        alert("Please complete your profile before applying for a vacancy.");
        navigate("/applicant/profile");
        return;
    }

    const success = applyToVacancy(vacancy);
    if (success) {
        setApplied(true);
        console.log("Applied for vacancy:", vacancy);
    }
    };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <Card className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {vacancy.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {vacancy.department}
              </p>
            </div>

            <Badge variant="info">{vacancy.status}</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Location</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {vacancy.location}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Application Deadline</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {vacancy.deadline}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Eligibility</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {vacancy.eligibility}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Experience</p>
              <p className="font-medium text-gray-800 dark:text-white">
                {vacancy.experience}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Job Description
          </h2>
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {vacancy.description}
          </p>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={handleApply}
            disabled={applied}
            variant={applied ? "secondary" : "primary"}
          >
            {applied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </main>
    </div>
  );
}