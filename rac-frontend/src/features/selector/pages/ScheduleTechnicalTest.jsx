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
import {
  canScheduleTechnicalTest,
  formatStage,
  getCandidateName,
  getVacancyId,
} from "../utils/selectorHelpers";

function formatDateTime(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

  const fetchData = async () => {
    try {
      const [vacancyData, candidateData] = await Promise.all([
        getVacancies(),
        getSelectorCandidates(),
      ]);

      setVacancies(Array.isArray(vacancyData) ? vacancyData : []);
      setCandidates(
        Array.isArray(candidateData?.candidates) ? candidateData.candidates : []
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Error loading schedule page");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedVacancy = vacancies.find((v) => v._id === form.vacancyId);

  const eligibleCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) =>
        getVacancyId(candidate) === form.vacancyId &&
        canScheduleTechnicalTest(candidate)
    );
  }, [candidates, form.vacancyId]);

  const alreadyAssignedCount = useMemo(() => {
    return candidates.filter((candidate) => {
      const sameVacancy = getVacancyId(candidate) === form.vacancyId;

      return (
        sameVacancy &&
        [
          "TECHNICAL_TEST_ASSIGNED",
          "TECHNICAL_TEST_IN_PROGRESS",
          "TECHNICAL_TEST_SUBMITTED",
          "TECHNICAL_QUALIFIED",
          "TECHNICAL_REJECTED",
          "PERSONALITY_TEST_ASSIGNED",
          "PERSONALITY_TEST_SUBMITTED",
          "FINAL_REVIEW",
          "SELECTED",
          "WAITLISTED",
          "FINAL_REJECTED",
        ].includes(candidate.currentStage)
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

  const resetFormAfterSubmit = () => {
    setForm((prev) => ({
      ...prev,
      startTime: "",
      endTime: "",
      resultDeclarationDate: "",
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

    if (eligibleCandidates.length === 0) {
      alert("No verified eligible candidates are available for this vacancy");
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
        `Technical test scheduled successfully. Assigned candidates: ${
          res.assignedCount || 0
        }`
      );

      resetFormAfterSubmit();
      await fetchData();
    } catch (err) {
      alert(err.message || "Error scheduling technical test");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell maxWidth="max-w-5xl">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading technical test scheduler...
          </p>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell maxWidth="max-w-5xl">
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
              Technical Test Scheduling
            </p>

            <h1 className="text-2xl font-semibold sm:text-3xl">
              Schedule technical test vacancy-wise
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Select a vacancy and assign the technical assessment to all verified
              eligible candidates for that vacancy.
            </p>
          </div>
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
                  <Badge variant="info">{selectedVacancy.status || "OPEN"}</Badge>

                  <Badge variant="success">
                    Eligible for Technical: {eligibleCandidates.length}
                  </Badge>

                  <Badge variant="warning">
                    Already in/after Technical: {alreadyAssignedCount}
                  </Badge>
                </div>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  <b>Department:</b> {selectedVacancy.department || "DRDO RAC"}
                </p>

                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <b>Deadline:</b> {formatDateTime(selectedVacancy.deadline)}
                </p>
              </div>
            )}

            {form.vacancyId && (
              <Card className="border border-gray-100 bg-gray-50 shadow-none dark:border-gray-700 dark:bg-gray-900/40">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Candidates to be assigned
                </p>

                {eligibleCandidates.length > 0 ? (
                  <div className="mt-3 max-h-56 space-y-2 overflow-y-auto">
                    {eligibleCandidates.map((candidate) => (
                      <div
                        key={candidate._id}
                        className="flex items-center justify-between rounded-xl bg-white px-3 py-2 dark:bg-gray-800"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {getCandidateName(candidate)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {candidate.applicationId || candidate.cid || candidate._id}
                          </p>
                        </div>

                        <Badge variant="success">
                          {formatStage(candidate.currentStage, candidate)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    No verified eligible candidates are waiting for technical test
                    assignment for this vacancy.
                  </p>
                )}
              </Card>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <DateTimeField
                label="Start Date & Time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
              />

              <DateTimeField
                label="End Date & Time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <DateTimeField
              label="Result Declaration Date"
              name="resultDeclarationDate"
              value={form.resultDeclarationDate}
              onChange={handleChange}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting || eligibleCandidates.length === 0}
              >
                {submitting ? "Scheduling..." : "Schedule Technical Test"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </PageShell>
  );
}

function PageShell({ children, maxWidth = "max-w-7xl" }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />

      <main className={`mx-auto ${maxWidth} px-4 py-6 sm:px-6 lg:px-8`}>
        {children}
      </main>
    </div>
  );
}

function DateTimeField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />
    </div>
  );
}