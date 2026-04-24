import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import { createVacancy } from "../services/vacancyService";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";

function CreateVacancy() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    mode: "Online Application",
    description: "",
    eligibility: "",
    experience: "",
    discipline: "",
    examTypeRequired: "",
    minGraduationPercentage: "",
    minTwelfthPercentage: "",
    minTenthPercentage: "",
    minGateScore: "",
    deadline: "",
    status: "OPEN",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Vacancy title is required";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.eligibility.trim()) newErrors.eligibility = "Eligibility is required";
    if (!form.deadline) newErrors.deadline = "Deadline is required";

    if (form.deadline) {
      const selectedDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline = "Deadline must be today or a future date";
      }
    }

    if (
      form.minGraduationPercentage &&
      (Number(form.minGraduationPercentage) < 0 ||
        Number(form.minGraduationPercentage) > 100)
    ) {
      newErrors.minGraduationPercentage =
        "Graduation percentage must be between 0 and 100";
    }

    if (
      form.minTwelfthPercentage &&
      (Number(form.minTwelfthPercentage) < 0 ||
        Number(form.minTwelfthPercentage) > 100)
    ) {
      newErrors.minTwelfthPercentage =
        "12th percentage must be between 0 and 100";
    }

    if (
      form.minTenthPercentage &&
      (Number(form.minTenthPercentage) < 0 ||
        Number(form.minTenthPercentage) > 100)
    ) {
      newErrors.minTenthPercentage =
        "10th percentage must be between 0 and 100";
    }

    if (form.minGateScore && Number(form.minGateScore) < 0) {
      newErrors.minGateScore = "GATE score cannot be negative";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await createVacancy({
        ...form,
        minGraduationPercentage: form.minGraduationPercentage
          ? Number(form.minGraduationPercentage)
          : 0,
        minTwelfthPercentage: form.minTwelfthPercentage
          ? Number(form.minTwelfthPercentage)
          : 0,
        minTenthPercentage: form.minTenthPercentage
          ? Number(form.minTenthPercentage)
          : 0,
        minGateScore: form.minGateScore ? Number(form.minGateScore) : 0,
      });

      alert("Vacancy created successfully");
      navigate("/admin/vacancies");
    } catch (error) {
      console.error("Create vacancy error:", error);
      alert("Failed to create vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <section className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Create Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure a new recruitment opening with eligibility rules, academic thresholds,
              and process-ready vacancy details.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-white/95 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
              <SectionTitle
                title="Basic Vacancy Information"
                subtitle="Core vacancy identity and applicant-facing details."
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input
                  label="Vacancy Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Scientist B - Computer Science"
                  error={errors.title}
                />

                <Input
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="DRDO RAC"
                  error={errors.department}
                />

                <Input
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="New Delhi"
                />

                <SelectField
                  label="Application Mode"
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  options={["Online Application", "Hybrid", "Offline"]}
                />

                <div className="md:col-span-2">
                  <TextAreaField
                    label="Vacancy Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and purpose of the vacancy..."
                    rows={5}
                    error={errors.description}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white/95 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
              <SectionTitle
                title="Eligibility and Academic Rules"
                subtitle="Define who is eligible to apply and minimum qualification thresholds."
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <TextAreaField
                    label="Eligibility Criteria"
                    name="eligibility"
                    value={form.eligibility}
                    onChange={handleChange}
                    placeholder="B.Tech / M.Tech in relevant discipline with required exam qualification..."
                    rows={4}
                    error={errors.eligibility}
                  />
                </div>

                <Input
                  label="Experience Requirement"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Freshers can apply / 0-2 years preferred"
                />

                <Input
                  label="Discipline"
                  name="discipline"
                  value={form.discipline}
                  onChange={handleChange}
                  placeholder="Computer Science / Mechanical / Electronics"
                />

                <SelectField
                  label="Exam Type Required"
                  name="examTypeRequired"
                  value={form.examTypeRequired}
                  onChange={handleChange}
                  options={["", "GATE", "NET", "None"]}
                />

                <Input
                  label="Minimum Graduation % / CGPA"
                  name="minGraduationPercentage"
                  value={form.minGraduationPercentage}
                  onChange={handleChange}
                  placeholder="Enter minimum graduation percentage"
                  error={errors.minGraduationPercentage}
                />

                <Input
                  label="Minimum 12th Percentage"
                  name="minTwelfthPercentage"
                  value={form.minTwelfthPercentage}
                  onChange={handleChange}
                  placeholder="Enter minimum 12th percentage"
                  error={errors.minTwelfthPercentage}
                />

                <Input
                  label="Minimum 10th Percentage"
                  name="minTenthPercentage"
                  value={form.minTenthPercentage}
                  onChange={handleChange}
                  placeholder="Enter minimum 10th percentage"
                  error={errors.minTenthPercentage}
                />

                <Input
                  label="Minimum GATE Score"
                  name="minGateScore"
                  value={form.minGateScore}
                  onChange={handleChange}
                  placeholder="Enter minimum GATE score"
                  error={errors.minGateScore}
                />
              </div>
            </Card>

            <Card className="bg-white/95 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
              <SectionTitle
                title="Publication and Deadline"
                subtitle="Set the vacancy status and application closing date."
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Vacancy Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  options={["OPEN", "DRAFT", "CLOSED"]}
                />

                <Input
                  label="Application Deadline"
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  error={errors.deadline}
                />
              </div>
            </Card>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/vacancies")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Creating Vacancy..." : "Create Vacancy"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
      >
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {option || "Select"}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-500 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
      />
      {error && (
        <span className="text-sm text-red-500 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}

export default CreateVacancy;