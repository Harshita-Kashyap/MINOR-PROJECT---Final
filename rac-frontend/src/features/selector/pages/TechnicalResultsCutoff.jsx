import { useEffect, useMemo, useState } from "react";
import Header from "../../landing/components/Header";
import SelectorRibbon from "../components/SelectorRibbon";
import Card from "../../../shared/components/ui/Card";
import Button from "../../../shared/components/ui/Button";
import Badge from "../../../shared/components/ui/Badge";
import { getVacancies } from "../../applicant/services/vacancyService";
import {
  getSelectorCandidates,
  getTechnicalResultsByVacancy,
  setTechnicalCutoff,
  schedulePersonalityTest,
} from "../services/selectorService";
import {
  SELECTOR_STAGES,
  normalizeStage,
} from "../utils/selectorHelpers";

function getVacancyId(value) {
  return typeof value === "object" ? value?._id : value;
}

function formatDateTime(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TechnicalResultsCutoff() {
  const [vacancies, setVacancies] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState("");
  const [technicalData, setTechnicalData] = useState(null);
  const [cutoff, setCutoff] = useState("");
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [cutoffSubmitting, setCutoffSubmitting] = useState(false);

  const [personalityForm, setPersonalityForm] = useState({
    startTime: "",
    endTime: "",
    resultDeclarationDate: "",
  });
  const [personalitySubmitting, setPersonalitySubmitting] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
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
        alert(err.message || "Unable to load technical results page");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const selectedVacancy = vacancies.find((v) => v._id === selectedVacancyId);

  const vacancyCandidates = useMemo(() => {
    return candidates.filter(
      (candidate) => getVacancyId(candidate.vacancyId) === selectedVacancyId
    );
  }, [candidates, selectedVacancyId]);

  const submittedCount = vacancyCandidates.filter(
    (candidate) =>
      normalizeStage(candidate.currentStage, candidate) ===
      SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED ||
      candidate.technicalTestStatus === "SUBMITTED"
  ).length;

  const qualifiedCount = vacancyCandidates.filter(
    (candidate) =>
      normalizeStage(candidate.currentStage, candidate) ===
      SELECTOR_STAGES.TECHNICAL_QUALIFIED
  ).length;

  const rejectedCount = vacancyCandidates.filter(
    (candidate) =>
      normalizeStage(candidate.currentStage, candidate) ===
      SELECTOR_STAGES.TECHNICAL_REJECTED
  ).length;

  const personalityAlreadyAssignedCount = vacancyCandidates.filter((candidate) =>
    [
      SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED,
      SELECTOR_STAGES.PERSONALITY_TEST_IN_PROGRESS,
      SELECTOR_STAGES.PERSONALITY_TEST_SUBMITTED,
      SELECTOR_STAGES.FINAL_REVIEW,
      SELECTOR_STAGES.SELECTED,
      SELECTOR_STAGES.WAITLISTED,
      SELECTOR_STAGES.FINAL_REJECTED,
    ].includes(normalizeStage(candidate.currentStage, candidate))
  ).length;

  const canSchedulePersonality =
    qualifiedCount > 0 && personalityAlreadyAssignedCount === 0;

  const fetchTechnicalResults = async (vacancyId) => {
    if (!vacancyId) {
      setTechnicalData(null);
      return;
    }

    try {
      setResultsLoading(true);
      const data = await getTechnicalResultsByVacancy(vacancyId);
      setTechnicalData(data);
    } catch (err) {
      alert(err.message || "Unable to load technical results");
      setTechnicalData(null);
    } finally {
      setResultsLoading(false);
    }
  };

  const handleVacancyChange = async (e) => {
    const vacancyId = e.target.value;
    setSelectedVacancyId(vacancyId);
    setCutoff("");
    setTechnicalData(null);
    await fetchTechnicalResults(vacancyId);
  };

  const handleSetCutoff = async (e) => {
    e.preventDefault();

    if (!selectedVacancyId || cutoff === "") {
      alert("Please select vacancy and enter cutoff");
      return;
    }

    try {
      setCutoffSubmitting(true);

      const res = await setTechnicalCutoff({
        vacancyId: selectedVacancyId,
        cutoff: Number(cutoff),
      });

      alert(
        `Cutoff applied. Qualified: ${res.qualifiedCount}, Rejected: ${res.rejectedCount}`
      );

      const updatedCandidates = await getSelectorCandidates();
      setCandidates(updatedCandidates?.candidates || []);
      await fetchTechnicalResults(selectedVacancyId);
    } catch (err) {
      alert(err.message || "Unable to set cutoff");
    } finally {
      setCutoffSubmitting(false);
    }
  };

  const handlePersonalityChange = (e) => {
    const { name, value } = e.target;

    setPersonalityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSchedulePersonality = async (e) => {
    e.preventDefault();

    if (!selectedVacancyId || !personalityForm.startTime || !personalityForm.endTime) {
      alert("Please select vacancy, start time and end time");
      return;
    }

    if (new Date(personalityForm.endTime) <= new Date(personalityForm.startTime)) {
      alert("End time must be after start time");
      return;
    }

    try {
      setPersonalitySubmitting(true);

      const res = await schedulePersonalityTest({
        vacancyId: selectedVacancyId,
        startTime: personalityForm.startTime,
        endTime: personalityForm.endTime,
        resultDeclarationDate: personalityForm.resultDeclarationDate || null,
      });

      alert(
        `Personality test scheduled successfully. Assigned candidates: ${res.assignedCount}`
      );

      setPersonalityForm({
        startTime: "",
        endTime: "",
        resultDeclarationDate: "",
      });

      const updatedCandidates = await getSelectorCandidates();
      setCandidates(updatedCandidates?.candidates || []);
    } catch (err) {
      alert(err.message || "Unable to schedule personality test");
    } finally {
      setPersonalitySubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading technical results...
          </p>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-100">
              Technical Results & Cutoff
            </p>

            <h1 className="text-2xl font-semibold sm:text-3xl">
              Apply technical cutoff and move qualified candidates forward
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100">
              Review submitted technical test results, set vacancy-wise cutoff,
              and schedule personality test for technically qualified candidates.
            </p>
          </div>
        </section>

        <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Vacancy
          </label>

          <select
            value={selectedVacancyId}
            onChange={handleVacancyChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Select vacancy</option>
            {vacancies.map((vacancy) => (
              <option key={vacancy._id} value={vacancy._id}>
                {vacancy.title}
              </option>
            ))}
          </select>
        </Card>

        {selectedVacancy && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric title="Total Candidates" value={vacancyCandidates.length} />
              <Metric title="Technical Submitted" value={submittedCount} tone="info" />
              <Metric title="Qualified" value={qualifiedCount} tone="success" />
              <Metric title="Rejected" value={rejectedCount} tone="danger" />
            </div>

            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">{selectedVacancy.status || "OPEN"}</Badge>
                <Badge variant="success">
                  {selectedVacancy.department || "DRDO RAC"}
                </Badge>
              </div>

              <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                {selectedVacancy.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Review technical submissions and apply cutoff for this vacancy.
              </p>
            </Card>

            <div className="grid gap-6 xl:grid-cols-12">
              <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-7">
                <SectionHeader
                  title="Technical Result Submissions"
                  subtitle="Results submitted by applicants for this vacancy."
                />

                {resultsLoading ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading results...
                  </p>
                ) : technicalData?.results?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-sm">
                      <thead className="border-b border-gray-200 bg-gray-50 text-left text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                          <th className="px-4 py-3">Candidate</th>
                          <th className="px-4 py-3">Application</th>
                          <th className="px-4 py-3">Score</th>
                          <th className="px-4 py-3">Percentage</th>
                          <th className="px-4 py-3">Submitted</th>
                        </tr>
                      </thead>

                      <tbody>
                        {technicalData.results.map((result) => (
                          <tr
                            key={result._id}
                            className="border-b border-gray-100 dark:border-gray-700"
                          >
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {result.applicantId?.name || "N/A"}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {result.applicantId?.email || "N/A"}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                              {result.applicationId?.applicationId || "N/A"}
                            </td>

                            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                              {result.finalScore ?? result.score ?? 0}/
                              {result.totalMarks ?? "-"}
                            </td>

                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                              {Number(result.percentage || 0).toFixed(2)}%
                            </td>

                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                              {formatDateTime(result.submittedAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState message="No technical submissions found for this vacancy yet." />
                )}
              </Card>

              <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80 xl:col-span-5">
                <SectionHeader
                  title="Set Technical Cutoff"
                  subtitle="Candidates at or above cutoff move to technical qualified stage."
                />

                {technicalData?.analytics && (
                  <div className="mb-4 grid gap-3 sm:grid-cols-3">
                    <MiniStat label="Highest" value={technicalData.analytics.highest} />
                    <MiniStat label="Lowest" value={technicalData.analytics.lowest} />
                    <MiniStat label="Average" value={technicalData.analytics.average} />
                  </div>
                )}

                <form onSubmit={handleSetCutoff} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cutoff Score
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={cutoff}
                      onChange={(e) => setCutoff(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                      placeholder="Example: 8"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      cutoffSubmitting ||
                      !technicalData?.results?.length ||
                      cutoff === ""
                    }
                    fullWidth
                  >
                    {cutoffSubmitting ? "Applying Cutoff..." : "Apply Technical Cutoff"}
                  </Button>
                </form>
              </Card>
            </div>

            <Card className="border border-gray-200/80 shadow-sm dark:border-gray-700/80">
              <SectionHeader
                title="Schedule Personality Test"
                subtitle="Only technically qualified candidates will be assigned this test."
              />

              <form onSubmit={handleSchedulePersonality} className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={qualifiedCount > 0 ? "success" : "warning"}>
                    Qualified Candidates: {qualifiedCount}
                  </Badge>

                  <Badge variant={personalityAlreadyAssignedCount > 0 ? "info" : "warning"}>
                    Already Assigned / Moved Ahead: {personalityAlreadyAssignedCount}
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <DateInput
                    label="Start Date & Time"
                    name="startTime"
                    value={personalityForm.startTime}
                    onChange={handlePersonalityChange}
                  />

                  <DateInput
                    label="End Date & Time"
                    name="endTime"
                    value={personalityForm.endTime}
                    onChange={handlePersonalityChange}
                  />
                </div>

                <DateInput
                  label="Result Declaration Date"
                  name="resultDeclarationDate"
                  value={personalityForm.resultDeclarationDate}
                  onChange={handlePersonalityChange}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={personalitySubmitting || !canSchedulePersonality}
                  >
                    {personalitySubmitting
                      ? "Scheduling..."
                      : "Schedule Personality Test"}
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <SelectorRibbon />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Metric({ title, value, tone = "default" }) {
  const toneMap = {
    default: "from-gray-50 to-white dark:from-gray-800 dark:to-gray-800",
    info: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-gray-800",
    success:
      "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-gray-800",
    danger: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-gray-800",
  };

  return (
    <Card
      className={`border border-gray-200/80 bg-gradient-to-br shadow-sm dark:border-gray-700/80 ${toneMap[tone] || toneMap.default
        }`}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value ?? 0}
      </h2>
    </Card>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900/40">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {value ?? 0}
      </p>
    </div>
  );
}

function DateInput({ label, name, value, onChange }) {
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

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}