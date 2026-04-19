import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateVacancy } from "../services/vacancyService";
import API from "../../../shared/services/api";
import Header from "../../landing/components/Header";

function EditVacancy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    description: "",
    eligibility: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await API.get("/vacancies");
        const vacancy = res.data.find((v) => v.id == id);

        if (vacancy) {
          setForm({
            title: vacancy.title || "",
            department: vacancy.department || "",
            description: vacancy.description || "",
            eligibility: vacancy.eligibility || "",
            deadline: vacancy.deadline?.split("T")[0] || "",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVacancy();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateVacancy(id, form);
      alert("Updated successfully");
      navigate("/admin/vacancies");
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="p-6 ml-64 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
          Loading...
        </div>
      </>
    );

  return (
    <>
      <Header />

      <div className="ml-64 min-h-screen bg-gray-50 p-6 transition dark:bg-gray-900 dark:text-gray-100">
        
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Vacancy
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update vacancy details for recruitment
          </p>
        </div>

        {/* FORM CARD */}
        <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
              />
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Department
              </label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
              />
            </div>

            {/* ELIGIBILITY */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Eligibility
              </label>
              <textarea
                name="eligibility"
                value={form.eligibility}
                onChange={handleChange}
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
              />
            </div>

            {/* DEADLINE */}
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-900"
              />
            </div>

            {/* BUTTON */}
            <div className="pt-2">
              <button className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Update Vacancy
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditVacancy;