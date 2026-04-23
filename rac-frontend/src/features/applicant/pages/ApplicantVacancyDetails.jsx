import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import ApplicantRibbon from "../components/ApplicantRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";

import { getVacancyById } from "../services/vacancyService";
import { applyToVacancy } from "../services/applicantService";

export default function ApplicantVacancyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  // 🚀 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1️⃣ Vacancy
        const vacancyData = await getVacancyById(id);
        setVacancy(vacancyData);

        // 2️⃣ Profile
        const res = await fetch("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();

        if (data.success) {
          setProfileComplete(
            data.profile?.profileStatus === "COMPLETE"
          );
        }

      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🚀 APPLY
  const handleApply = async () => {
    if (!profileComplete) {
      alert("Please complete your profile first");
      navigate("/applicant/profile");
      return;
    }

    try {
      await applyToVacancy(id);
      alert("Applied Successfully ✅");
      setApplied(true);
    } catch (err) {
      alert(err.message || "Error applying");
    }
  };

  // 🔄 LOADING
  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  // ❌ NOT FOUND
  if (!vacancy) {
    return <h2 className="text-center mt-10">Vacancy not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <ApplicantRibbon />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">

          {/* 🧾 MAIN CARD */}
          <Card>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{vacancy.title}</h1>
                <p className="text-gray-500">{vacancy.department}</p>
              </div>

              <Badge>{vacancy.status}</Badge>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <p><b>Location:</b> {vacancy.location}</p>
              <p><b>Mode:</b> {vacancy.mode}</p>
              <p>
                <b>Deadline:</b>{" "}
                {vacancy.deadline
                  ? new Date(vacancy.deadline).toDateString()
                  : "N/A"}
              </p>
              <p><b>Experience:</b> {vacancy.experience}</p>
              <p><b>Eligibility:</b> {vacancy.eligibility}</p>
            </div>
          </Card>

          {/* DESCRIPTION */}
          <Card>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{vacancy.description}</p>
          </Card>

          {/* PROFILE WARNING */}
          {!profileComplete && (
            <Card>
              <p className="text-red-500">
                ⚠ Please complete your profile before applying
              </p>
            </Card>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <Button onClick={() => navigate("/applicant/vacancies")}>
              Back
            </Button>

            <Button
              onClick={handleApply}
              disabled={applied}
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