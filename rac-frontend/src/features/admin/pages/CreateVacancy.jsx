import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import { createVacancy } from "../services/vacancyService";
import VacancyForm, {
  getInitialVacancyForm,
  prepareVacancyPayload,
  validateVacancyForm,
} from "../components/VacancyForm";

function CreateVacancy() {
  const navigate = useNavigate();

  const [form, setForm] = useState(getInitialVacancyForm());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateVacancyForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await createVacancy(prepareVacancyPayload(form));

      alert("Vacancy created successfully");
      navigate("/admin/vacancies");
    } catch (error) {
      console.error("Create vacancy error:", error);
      alert(error.response?.data?.message || "Failed to create vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Create Vacancy
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create a new vacancy. Admin manages vacancy resources only; candidate movement remains automated or selector-driven.
          </p>
        </div>

        <VacancyForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/vacancies")}
          loading={loading}
          submitLabel="Create Vacancy"
          loadingLabel="Creating Vacancy..."
          mode="create"
        />
      </main>
    </div>
  );
}

export default CreateVacancy;