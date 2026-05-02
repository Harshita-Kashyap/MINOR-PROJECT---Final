import {
  SELECTOR_STAGES,
  normalizeStage,
  getCompositeScore,
  getVacancyTitle,
  formatStage,
} from "./selectorHelpers";

// ================= FILTER CANDIDATES =================
export function filterCandidates(candidates, { vacancy, stage }) {
  return candidates.filter((c) => {
    const normalizedStage = normalizeStage(c.currentStage, c);

    const matchesVacancy =
      vacancy === "All" || getVacancyTitle(c) === vacancy;

    const matchesStage =
      stage === "All" || normalizedStage === stage;

    return matchesVacancy && matchesStage;
  });
}

// ================= LIMIT + SORT =================
export function getTopCandidates(candidates, limit = 7) {
  return [...candidates]
    .map((c) => ({
      ...c,
      total: c.overallScore || getCompositeScore(c),
      normalizedStage: normalizeStage(c.currentStage, c),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

// ================= CHART DATA =================
export function getChartData(candidates) {
  return candidates.map((c) => ({
    name: c.userId?.name || "Candidate",
    technical: c.technicalScore || 0,
    personality: c.personalityScore || 0,
    overall: c.overallScore || getCompositeScore(c),
    stage: formatStage(c.normalizedStage || c.currentStage, c),
  }));
}

// ================= METRICS =================
export function getAnalyticsMetrics(candidates) {
  const total = candidates.length || 1;

  const scored = candidates.filter(
    (c) => c.technicalScore !== null || c.personalityScore !== null
  );

  return {
    averageTechnical: Math.round(
      scored.reduce((sum, c) => sum + Number(c.technicalScore || 0), 0) /
        (scored.length || 1)
    ),

    averagePersonality: Math.round(
      scored.reduce((sum, c) => sum + Number(c.personalityScore || 0), 0) /
        (scored.length || 1)
    ),

    finalReviewCount: candidates.filter(
      (c) =>
        normalizeStage(c.currentStage, c) ===
        SELECTOR_STAGES.FINAL_REVIEW
    ).length,

    technicalQualifiedCount: candidates.filter(
      (c) =>
        normalizeStage(c.currentStage, c) ===
        SELECTOR_STAGES.TECHNICAL_QUALIFIED
    ).length,

    completedCount: candidates.filter((c) =>
      [
        SELECTOR_STAGES.SELECTED,
        SELECTOR_STAGES.WAITLISTED,
        SELECTOR_STAGES.FINAL_REJECTED,
      ].includes(normalizeStage(c.currentStage, c))
    ).length,
  };
}

// ================= UNIQUE VACANCIES =================
export function getVacancyList(candidates) {
  return [
    "All",
    ...new Set(candidates.map((c) => getVacancyTitle(c)).filter(Boolean)),
  ];
}