import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getVacancies } from "../../applicant/services/vacancyService";
import {
  getSelectorCandidates,
  scheduleTechnicalTest,
} from "../services/selectorService";

export default function ScheduleTechnicalTest() {
  const [vacancies, setVacancies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    vacancyId: "",
    startTime: "",
    endTime: "",
    resultDeclarationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vacancyData, candidateData] = await Promise.all([
          getVacancies(),
          getSelectorCandidates(),
        ]);

        setVacancies(vacancyData || []);
        setCandidates(candidateData?.candidates || []);
      } catch (err) {
        console.error(err);
        alert(err.message || "Error loading schedule page");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedVacancy = vacancies.find((v) => v._id === form.vacancyId);

  const eligibleCount = useMemo(() => {
    return candidates.filter((c) => {
      const candidateVacancyId =
        typeof c.vacancyId === "object" ? c.vacancyId._id : c.vacancyId;

      return (
        candidateVacancyId === form.vacancyId &&
        c.currentStage === "VERIFICATION_ELIGIBLE" &&
        c.verificationStatus === "ELIGIBLE"
      );
    }).length;
  }, [candidates, form.vacancyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.vacancyId || !form.startTime || !form.endTime) {
      alert("Please select vacancy, start time and end time");
      return;
    }

    if (new Date(form.endTime) <= new Date(form.startTime)) {
      alert("End time must be after start time");
      return;
    }

    try {
      setSubmitting(true);

      const res = await scheduleTechnicalTest({
        vacancyId: form.vacancyId,
        startTime: form.startTime,
        endTime: form.endTime,
        resultDeclarationDate: form.resultDeclarationDate || null,
      });

      alert(
        `Technical test scheduled successfully. Assigned candidates: ${res.assignedCount}`
      );

      const updatedCandidates = await getSelectorCandidates();
      setCandidates(updatedCandidates?.candidates || []);
    } catch (err) {
      alert(err.message || "Error scheduling test");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Header />
        <SelectorRibbon />
        <main className="mx-auto max-w-5xl px-4 py-6">
          <Card>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading technical test scheduler...
            </p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-6">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Schedule Technical Test
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a vacancy and assign a scheduled technical test to eligible candidates.
            </p>
          </section>

          <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vacancy
                </label>

                <select
                  name="vacancyId"
                  value={form.vacancyId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">Select vacancy</option>

                  {vacancies.map((vacancy) => (
                    <option key={vacancy._id} value={vacancy._id}>
                      {vacancy.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedVacancy && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="info">{selectedVacancy.status}</Badge>
                    <Badge variant="success">
                      Eligible Candidates: {eligibleCount}
                    </Badge>
                  </div>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    <b>Department:</b> {selectedVacancy.department}
                  </p>

                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    <b>Deadline:</b>{" "}
                    {selectedVacancy.deadline
                      ? new Date(selectedVacancy.deadline).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Result Declaration Date
                </label>

                <input
                  type="datetime-local"
                  name="resultDeclarationDate"
                  value={form.resultDeclarationDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={submitting || eligibleCount === 0}>
                  {submitting ? "Scheduling..." : "Schedule Technical Test"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}