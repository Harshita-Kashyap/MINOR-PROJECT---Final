import { useState } from "react";
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

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!form.title) newErrors.title = "Title is required";
    if (!form.department) newErrors.department = "Department is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.eligibility) newErrors.eligibility = "Eligibility is required";
    if (!form.deadline) newErrors.deadline = "Deadline is required";

    return newErrors;
  };

  // ✅ Submit form
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
      console.error("Create error:", error);
      alert("❌ Failed to create vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <AdminNavbar />

      <div className="p-6 max-w-2xl mx-auto">

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Create Vacancy
        </h2>

        {/* 📄 FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
        >

          {/* TITLE */}
          <div>
            <input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* DEPARTMENT */}
          <div>
            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">{errors.department}</p>
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

          {/* ELIGIBILITY */}
          <div>
            <input
              name="eligibility"
              placeholder="Eligibility Criteria"
              value={form.eligibility}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            {errors.eligibility && (
              <p className="text-red-500 text-sm">{errors.eligibility}</p>
            )}
          </div>

          {/* DEADLINE */}
          <div>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline}</p>
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