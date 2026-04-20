import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import {
  applyToVacancy,
  hasApplied,
} from "../../../shared/utils/applicationStorage";
import { isProfileComplete } from "../../../shared/utils/profileStorage";

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
    mode: "Online Application",
    stages: [
      "Profile Verification",
      "Technical Test",
      "Personality Test",
      "Final Merit Review",
    ],
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
    mode: "Online Application",
    stages: [
      "Profile Verification",
      "Technical Test",
      "Personality Test",
      "Final Merit Review",
    ],
  },
];

export default function ApplicantVacancyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vacancy = vacancies.find((item) => item.id === id);
  const [applied, setApplied] = useState(false);
  const profileComplete = isProfileComplete();

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
        <main className="mx-auto max-w-5xl px-4 py-6">
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
    if (!profileComplete) {
      alert("Please complete your profile before applying for a vacancy.");
      navigate("/applicant/profile");
      return;
    }

    const success = applyToVacancy(vacancy);
    if (success) {
      setApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Card className="space-y-5 border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vacancy.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {vacancy.department}
                </p>
              </div>

              <Badge variant="info">{vacancy.status}</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vacancy.location}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Application Deadline</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vacancy.deadline}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Eligibility</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vacancy.eligibility}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Experience</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vacancy.experience}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Mode</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {vacancy.mode}
                </p>
              </div>
            </div>
          </Card>

          <Card className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Job Description
            </h2>
            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
              {vacancy.description}
            </p>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Selection Process
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {vacancy.stages.map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900/40"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {stage}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {!profileComplete && (
            <Card className="border border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20">
              <h3 className="text-base font-semibold text-amber-900 dark:text-amber-300">
                Complete your profile before applying
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-800 dark:text-gray-200">
                Your profile must include all required personal, academic, and exam details
                before your application can be submitted for verification.
              </p>
            </Card>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => navigate("/applicant/vacancies")}
            >
              Back to Vacancies
            </Button>

            <Button
              onClick={handleApply}
              disabled={applied}
              variant={applied ? "secondary" : "primary"}
            >
              {applied
                ? "Applied"
                : profileComplete
                ? "Apply Now"
                : "Complete Profile First"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}