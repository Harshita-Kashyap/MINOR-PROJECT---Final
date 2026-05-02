import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../landing/components/Header";
import AdminNavbar from "../components/AdminNavbar";
import { getVacancyById, updateVacancy } from "../services/vacancyService";
import Card from "../../../shared/components/ui/Card";
import VacancyForm, {
  getInitialVacancyForm,
  mapVacancyToForm,
  prepareVacancyPayload,
  validateVacancyForm,
} from "../components/VacancyForm";

function EditVacancy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(getInitialVacancyForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        setLoading(true);
        setPageError("");

        const res = await getVacancyById(id);
        const vacancy = res.data?.vacancy;

        if (!vacancy) {
          setPageError("Vacancy not found");
          return;
        }

        setForm(mapVacancyToForm(vacancy));
      } catch (error) {
        console.error("Fetch vacancy error:", error);
        setPageError("Failed to load vacancy details");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateVacancyForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSaving(true);
      await updateVacancy(id, prepareVacancyPayload(form));

      alert("Vacancy updated successfully");
      navigate("/admin/vacancies");
    } catch (error) {
      console.error("Update vacancy error:", error);
      alert(error.response?.data?.message || "Failed to update vacancy");
    } finally {
      setSaving(false);
    }
  };

  if (loading || pageError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
        <Header />
        <AdminNavbar />

        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Card className="border border-gray-200/80 bg-white/95 shadow-sm dark:border-gray-700/70 dark:bg-gray-900/80">
            <p className={pageError ? "text-sm text-red-500" : "text-sm text-gray-500"}>
              {pageError || "Loading vacancy details..."}
            </p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-[#030712] dark:via-[#0b1220] dark:to-[#111827]">
      <Header />
      <AdminNavbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Edit Vacancy
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update vacancy information, deadline, publication status, and eligibility rules.
          </p>
        </div>

        <VacancyForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/vacancies")}
          loading={saving}
          submitLabel="Update Vacancy"
          loadingLabel="Updating Vacancy..."
          mode="edit"
        />
      </main>
    </div>
  );
}

export default EditVacancy;