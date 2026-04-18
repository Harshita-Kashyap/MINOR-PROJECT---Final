import { useState } from "react";
import Header from "../components/landing/Header";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { createVacancy } from "../services/vacancyService";

function CreateVacancy() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    eligibility: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.eligibility.trim()) newErrors.eligibility = "Eligibility is required";
    if (!form.deadline) newErrors.deadline = "Deadline is required";

    // 🔥 Deadline should not be past date
    if (form.deadline && new Date(form.deadline) < new Date()) {
      newErrors.deadline = "Deadline must be a future date";
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

      await createVacancy(form);

      alert("✅ Vacancy created successfully!");
      navigate("/admin/vacancies");
    } catch (error) {
      console.error("Create vacancy error:", error);
      alert("❌ Failed to create vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Header />
      <AdminNavbar />

      <div className="p-6 max-w-2xl mx-auto">

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Create Vacancy
        </h2>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900"
          >
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter job title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Department
              </label>
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-500">{errors.department}</p>
              )}
            </div>

          {/* DESCRIPTION */}
          <div>
            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

            {/* Eligibility */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Eligibility Criteria
              </label>
              <input
                type="text"
                name="eligibility"
                placeholder="Enter eligibility criteria"
                value={form.eligibility}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              />
              {errors.eligibility && (
                <p className="mt-1 text-sm text-red-500">{errors.eligibility}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
              )}
            </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Vacancy"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateVacancy;