import { useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
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

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setSuccess("");

      await axios.post("http://localhost:5000/api/vacancies", form);

      setSuccess("✅ Vacancy created successfully!");

      // Reset form
      setForm({
        title: "",
        department: "",
        description: "",
        eligibility: "",
        deadline: "",
      });

      // Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/admin/vacancies");
      }, 1500);

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

        {/* ✅ SUCCESS MESSAGE */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

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
              rows="4"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
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
            className={`w-full py-2 rounded text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
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