// src/pages/ApplicantProfile.jsx
import { useState } from "react";
import Header from "../components/landing/Header";
import ApplicantRibbon from "../components/applicant/ApplicantRibbon";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ApplicantProfile() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    category: "",
    qualification: "",
    specialization: "",
    institute: "",
    gateScore: "",
    publications: "",
    resume: null,
  });

  const [saved, setSaved] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "email",
      "mobile",
      "dob",
      "gender",
      "category",
      "qualification",
      "specialization",
      "institute",
      "gateScore",
    ];

    const isComplete =
      requiredFields.every(
        (field) => form[field] && form[field].toString().trim() !== ""
      ) && form.resume;

    const profileDataToSave = {
      ...form,
      resume: form.resume ? form.resume.name : "",
    };

    localStorage.setItem(
      "applicantProfile",
      JSON.stringify(profileDataToSave)
    );
    localStorage.setItem(
      "applicantProfileComplete",
      isComplete ? "true" : "false"
    );

    console.log("Applicant Profile Data:", profileDataToSave);

    setProfileComplete(!!isComplete);
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <ApplicantRibbon />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Card className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Applicant Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Complete your profile before applying for vacancies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              <Input
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />

              <Input
                label="Date of Birth"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />

              <Input
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="Male / Female / Other"
              />

              <Input
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="General / OBC / SC / ST"
              />

              <Input
                label="Highest Qualification"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="B.Tech / M.Tech / PhD"
              />

              <Input
                label="Specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Computer Science"
              />

              <Input
                label="Institute / University"
                name="institute"
                value={form.institute}
                onChange={handleChange}
                placeholder="Enter institute name"
              />

              <Input
                label="GATE Score"
                name="gateScore"
                value={form.gateScore}
                onChange={handleChange}
                placeholder="Enter GATE score"
              />
            </div>

            <Input
              label="Research Publications"
              name="publications"
              value={form.publications}
              onChange={handleChange}
              placeholder="Enter publications details"
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload Resume (PDF)
              </label>

              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-900 dark:text-white"
              />

              {form.resume && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Selected file: {form.resume.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Button type="submit">Save Profile</Button>

              {saved && profileComplete && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  Profile saved successfully and marked complete.
                </span>
              )}

              {saved && !profileComplete && (
                <span className="text-sm text-yellow-600 dark:text-yellow-400">
                  Profile saved, but some required fields are missing.
                </span>
              )}
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}