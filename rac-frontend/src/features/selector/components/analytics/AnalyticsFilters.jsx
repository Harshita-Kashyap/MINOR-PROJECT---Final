import {
  SELECTOR_STAGES,
  formatStage,
} from "../../utils/selectorHelpers";

const STAGE_FILTERS = [
  "All",
  SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED,
  SELECTOR_STAGES.TECHNICAL_QUALIFIED,
  SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED,
  SELECTOR_STAGES.PERSONALITY_TEST_SUBMITTED,
  SELECTOR_STAGES.FINAL_REVIEW,
  SELECTOR_STAGES.SELECTED,
  SELECTOR_STAGES.WAITLISTED,
  SELECTOR_STAGES.FINAL_REJECTED,
];

const LIMIT_OPTIONS = [7, 10, 15, 20, 50];

export default function AnalyticsFilters({
  vacancies,
  selectedVacancy,
  setSelectedVacancy,
  selectedStage,
  setSelectedStage,
  limit,
  setLimit,
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <select
        value={selectedVacancy}
        onChange={(e) => setSelectedVacancy(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      >
        {vacancies.map((vacancy) => (
          <option key={vacancy} value={vacancy}>
            {vacancy === "All" ? "All Vacancies" : vacancy}
          </option>
        ))}
      </select>

      <select
        value={selectedStage}
        onChange={(e) => setSelectedStage(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      >
        {STAGE_FILTERS.map((stage) => (
          <option key={stage} value={stage}>
            {stage === "All" ? "All Stages" : formatStage(stage)}
          </option>
        ))}
      </select>

      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      >
        {LIMIT_OPTIONS.map((item) => (
          <option key={item} value={item}>
            Show first {item} candidates
          </option>
        ))}
      </select>
    </div>
  );
}