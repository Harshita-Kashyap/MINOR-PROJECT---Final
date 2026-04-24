import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import ApplicantStats from "../components/ApplicantStats";
import VacancyCard from "../components/VacancyCard";
import ApplicationStatusCard from "../components/ApplicationStatusCard";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";

import { getVacancies } from "../services/vacancyService";

export default function ApplicantDashboard() {
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 FETCH ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1️⃣ Profile
        const profileRes = await fetch("http://localhost:5000/api/profile/me", {
          headers: { Authorization: "Bearer " + token },
        });
        const profileData = await profileRes.json();

        // 2️⃣ Vacancies
       const res = await fetch("http://localhost:5000/api/vacancies", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

        // 3️⃣ Applications (if API ready)
        let appData = { applications: [] };
        try {
          const appRes = await fetch("http://localhost:5000/api/applications/my", {
            headers: { Authorization: "Bearer " + token },
          });
          appData = await appRes.json();
        } catch {
          console.warn("Applications API not ready yet");
        }

        setProfile(profileData.profile);
        setVacancies(vacancyData);
        setApplications(appData.applications || []);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧠 DERIVED DATA
  const applicantName = profile?.fullName || "Applicant";
  const profileComplete = profile?.profileStatus === "COMPLETE";

  const stats = [
    { title: "Open Vacancies", value: vacancies.length, tone: "info" },
    { title: "Applications Submitted", value: applications.length, tone: "default" },
    { title: "Pending Actions", value: 0, tone: "warning" },
    { title: "Final Results", value: 0, tone: "success" },
  ];

  const latestApplication = applications[0];

  const quickActions = useMemo(() => {
    const actions = [];

    actions.push({
      title: profileComplete ? "Profile Ready" : "Complete Your Profile",
      description: profileComplete
        ? "Your profile is ready for applications."
        : "Complete required details before applying.",
      actionLabel: profileComplete ? "View Profile" : "Complete Profile",
      onClick: () => navigate("/applicant/profile"),
      variant: profileComplete ? "outline" : "primary",
    });

    actions.push({
      title: "Browse Vacancies",
      description: "Explore openings and apply.",
      actionLabel: "View Vacancies",
      onClick: () => navigate("/applicant/vacancies"),
      variant: "outline",
    });

    actions.push({
      title: "Track Applications",
      description: "Monitor progress and results.",
      actionLabel: "View Applications",
      onClick: () => navigate("/applicant/applications"),
      variant: "outline",
    });

    return actions;
  }, [profileComplete, navigate]);
  
  // 🔄 LOADING STATE
  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="space-y-6">

          {/* HEADER */}
          <section className="rounded-3xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-semibold">
              Welcome, {applicantName}
            </h1>

            <p className="mt-2 text-sm">
              Manage your profile, apply, and track applications.
            </p>

            <div className="mt-3">
              <Badge>
                {profileComplete ? "Profile Ready" : "Profile Incomplete"}
              </Badge>
            </div>
          </section>

          {/* STATS */}
          <ApplicantStats stats={stats} />

          {/* QUICK ACTIONS */}
          <section className="grid gap-4 md:grid-cols-3">
            {quickActions.map((item, i) => (
              <Card key={i}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm mt-2">{item.description}</p>
                <Button className="mt-3" onClick={item.onClick}>
                  {item.actionLabel}
                </Button>
              </Card>
            ))}
          </section>

          {/* VACANCIES */}
          <section>
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">Latest Vacancies</h2>
              <Button onClick={() => navigate("/applicant/vacancies")}>
                View All
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vacancies.length === 0 ? (
                <p>No vacancies available</p>
              ) : (
                vacancies.slice(0, 4).map((v) => (
                  <VacancyCard key={v._id} vacancy={v} />
                ))
              )}
            </div>
          </section>

          {/* APPLICATIONS */}
          <section>
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">My Applications</h2>
              <Button onClick={() => navigate("/applicant/applications")}>
                View All
              </Button>
            </div>

            {applications.length === 0 ? (
              <Card>
                <p>No applications yet</p>
                <Button onClick={() => navigate("/applicant/vacancies")}>
                  Apply Now
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {applications.slice(0, 4).map((app) => (
                  <ApplicationStatusCard key={app._id} application={app} />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}