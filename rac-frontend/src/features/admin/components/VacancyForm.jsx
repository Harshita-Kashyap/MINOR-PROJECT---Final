import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";

const initialVacancyForm = {
  title: "",
  department: "DRDO RAC",
  advertisementNo: "",
  location: "",
  mode: "Online Application",
  totalPosts: "",
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
  status: "DRAFT",
};

export function getInitialVacancyForm() {
  return initialVacancyForm;
}

export function prepareVacancyPayload(form) {
  return {
    ...form,
    totalPosts: form.totalPosts ? Number(form.totalPosts) : 0,
    examTypeRequired: form.examTypeRequired === "None" ? "NONE" : form.examTypeRequired,
    minGraduationPercentage: form.minGraduationPercentage
      ? Number(form.minGraduationPercentage)
      : null,
    minTwelfthPercentage: form.minTwelfthPercentage
      ? Number(form.minTwelfthPercentage)
      : null,
    minTenthPercentage: form.minTenthPercentage
      ? Number(form.minTenthPercentage)
      : null,
    minGateScore: form.minGateScore ? Number(form.minGateScore) : null,
  };
}

export function mapVacancyToForm(vacancy) {
  return {
    title: vacancy.title || "",
    department: vacancy.department || "DRDO RAC",
    advertisementNo: vacancy.advertisementNo || "",
    location: vacancy.location || "",
    mode: vacancy.mode || "Online Application",
    totalPosts: vacancy.totalPosts?.toString() || "",
    description: vacancy.description || "",
    eligibility: vacancy.eligibility || "",
    experience: vacancy.experience || "",
    discipline: vacancy.discipline || "",
    examTypeRequired:
      vacancy.examTypeRequired === "NONE" ? "None" : vacancy.examTypeRequired || "",
    minGraduationPercentage: vacancy.minGraduationPercentage?.toString() || "",
    minTwelfthPercentage: vacancy.minTwelfthPercentage?.toString() || "",
    minTenthPercentage: vacancy.minTenthPercentage?.toString() || "",
    minGateScore: vacancy.minGateScore?.toString() || "",
    deadline: vacancy.deadline ? vacancy.deadline.split("T")[0] : "",
    status: vacancy.status || "DRAFT",
  };
}

export function validateVacancyForm(form) {
  const errors = {};

  if (!form.title.trim()) errors.title = "Vacancy title is required";
  if (!form.department.trim()) errors.department = "Department is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.eligibility.trim()) errors.eligibility = "Eligibility is required";
  if (!form.deadline) errors.deadline = "Deadline is required";

  const percentFields = [
    ["minGraduationPercentage", "Graduation percentage"],
    ["minTwelfthPercentage", "12th percentage"],
    ["minTenthPercentage", "10th percentage"],
  ];

  percentFields.forEach(([field, label]) => {
    if (form[field] && (Number(form[field]) < 0 || Number(form[field]) > 100)) {
      errors[field] = `${label} must be between 0 and 100`;
    }
  });

  if (form.minGateScore && Number(form.minGateScore) < 0) {
    errors.minGateScore = "GATE score cannot be negative";
  }

  if (form.totalPosts && Number(form.totalPosts) < 0) {
    errors.totalPosts = "Total posts cannot be negative";
  }

  return errors;
}

function VacancyForm({
  form,
  setForm,
  errors,
  setErrors,
  onSubmit,
  onCancel,
  loading,
  submitLabel,
  loadingLabel,
  mode = "create",
}) {
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

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card className="border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
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
            label="Advertisement Number"
            name="advertisementNo"
            value={form.advertisementNo}
            onChange={handleChange}
            placeholder="RAC/2026/01"
          />

          <Input
            label="Total Posts"
            name="totalPosts"
            value={form.totalPosts}
            onChange={handleChange}
            placeholder="10"
            error={errors.totalPosts}
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
              placeholder="Describe role, responsibilities, and purpose..."
              rows={5}
              error={errors.description}
            />
          </div>
        </div>
      </Card>

      <Card className="border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
        <SectionTitle
          title="Eligibility and Academic Rules"
          subtitle="These rules will be used by the system for automatic verification."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextAreaField
              label="Eligibility Criteria"
              name="eligibility"
              value={form.eligibility}
              onChange={handleChange}
              placeholder="B.Tech / M.Tech in relevant discipline..."
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
            placeholder="Computer Science / Electronics"
          />

          <SelectField
            label="Exam Type Required"
            name="examTypeRequired"
            value={form.examTypeRequired}
            onChange={handleChange}
            options={["", "GATE", "NET", "None"]}
          />

          <Input
            label="Minimum Graduation %"
            name="minGraduationPercentage"
            value={form.minGraduationPercentage}
            onChange={handleChange}
            placeholder="60"
            error={errors.minGraduationPercentage}
          />

          <Input
            label="Minimum 12th Percentage"
            name="minTwelfthPercentage"
            value={form.minTwelfthPercentage}
            onChange={handleChange}
            placeholder="60"
            error={errors.minTwelfthPercentage}
          />

          <Input
            label="Minimum 10th Percentage"
            name="minTenthPercentage"
            value={form.minTenthPercentage}
            onChange={handleChange}
            placeholder="60"
            error={errors.minTenthPercentage}
          />

          <Input
            label="Minimum GATE Score"
            name="minGateScore"
            value={form.minGateScore}
            onChange={handleChange}
            placeholder="500"
            error={errors.minGateScore}
          />
        </div>
      </Card>

      <Card className="border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
        <SectionTitle
          title="Publication and Deadline"
          subtitle="Admin controls only vacancy visibility and closing date."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <SelectField
            label="Vacancy Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["DRAFT", "OPEN", "CLOSED"]}
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

        {mode === "edit" && (
          <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
            Editing vacancy details will not manually move candidates between stages.
          </p>
        )}
      </Card>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? loadingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
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
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {option || "Select"}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, rows = 4, error }) {
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
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default VacancyForm;