export const SELECTOR_STAGES = {
  APPLIED: "APPLIED",
  VERIFICATION_PENDING: "VERIFICATION_PENDING",
  VERIFICATION_REVIEW: "VERIFICATION_REVIEW",
  VERIFICATION_REJECTED: "VERIFICATION_REJECTED",
  VERIFICATION_ELIGIBLE: "VERIFICATION_ELIGIBLE",

  TECHNICAL_TEST_ASSIGNED: "TECHNICAL_TEST_ASSIGNED",
  TECHNICAL_TEST_IN_PROGRESS: "TECHNICAL_TEST_IN_PROGRESS",
  TECHNICAL_TEST_SUBMITTED: "TECHNICAL_TEST_SUBMITTED",
  TECHNICAL_QUALIFIED: "TECHNICAL_QUALIFIED",
  TECHNICAL_REJECTED: "TECHNICAL_REJECTED",

  PERSONALITY_TEST_ASSIGNED: "PERSONALITY_TEST_ASSIGNED",
  PERSONALITY_TEST_IN_PROGRESS: "PERSONALITY_TEST_IN_PROGRESS",
  PERSONALITY_TEST_SUBMITTED: "PERSONALITY_TEST_SUBMITTED",

  FINAL_REVIEW: "FINAL_REVIEW",
  SELECTED: "SELECTED",
  WAITLISTED: "WAITLISTED",
  FINAL_REJECTED: "FINAL_REJECTED",
};

export const normalizeStage = (stage, candidate = {}) => {
  if (!stage) return SELECTOR_STAGES.APPLIED;

  const value = String(stage).trim().toUpperCase();

  if (value === "TECHNICAL") {
    if (candidate.technicalScore !== null && candidate.technicalScore !== undefined) {
      return SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED;
    }

    if (candidate.verificationStatus === "ELIGIBLE") {
      return SELECTOR_STAGES.VERIFICATION_ELIGIBLE;
    }

    return SELECTOR_STAGES.TECHNICAL_TEST_ASSIGNED;
  }

  if (value === "VERIFICATION") return SELECTOR_STAGES.VERIFICATION_PENDING;

  if (value === "COMPLETED") {
    if (candidate.finalStatus === "SELECTED") return SELECTOR_STAGES.SELECTED;
    if (candidate.finalStatus === "WAITLISTED") return SELECTOR_STAGES.WAITLISTED;
    if (candidate.finalStatus === "REJECTED") return SELECTOR_STAGES.FINAL_REJECTED;
    if (candidate.verificationStatus === "REJECTED") return SELECTOR_STAGES.VERIFICATION_REJECTED;

    return SELECTOR_STAGES.FINAL_REVIEW;
  }

  return value;
};

export const getCandidateName = (candidate) =>
  candidate?.userId?.name || candidate?.name || "N/A";

export const getCandidateEmail = (candidate) =>
  candidate?.userId?.email || "N/A";

export const getVacancyTitle = (candidate) =>
  candidate?.vacancyId?.title ||
  candidate?.vacancyTitle ||
  candidate?.vacancy ||
  "N/A";

export const getVacancyId = (candidate) =>
  typeof candidate?.vacancyId === "object"
    ? candidate?.vacancyId?._id
    : candidate?.vacancyId;

export const formatStage = (stage, candidate = {}) => {
  const normalized = normalizeStage(stage, candidate);

  const labels = {
    APPLIED: "Application Submitted",
    VERIFICATION_PENDING: "Verification Pending",
    VERIFICATION_REVIEW: "Verification Review",
    VERIFICATION_REJECTED: "Verification Rejected",
    VERIFICATION_ELIGIBLE: "Verification Eligible",

    TECHNICAL_TEST_ASSIGNED: "Technical Test Assigned",
    TECHNICAL_TEST_IN_PROGRESS: "Technical Test In Progress",
    TECHNICAL_TEST_SUBMITTED: "Technical Test Submitted",
    TECHNICAL_QUALIFIED: "Technical Qualified",
    TECHNICAL_REJECTED: "Technical Rejected",

    PERSONALITY_TEST_ASSIGNED: "Personality Test Assigned",
    PERSONALITY_TEST_IN_PROGRESS: "Personality Test In Progress",
    PERSONALITY_TEST_SUBMITTED: "Personality Test Submitted",

    FINAL_REVIEW: "Final Review",
    SELECTED: "Selected",
    WAITLISTED: "Waitlisted",
    FINAL_REJECTED: "Not Selected",
  };

  return labels[normalized] || normalized.replaceAll("_", " ");
};

export const getTechnicalScore = (candidate) =>
  candidate?.technicalScore ?? candidate?.technical ?? "-";

export const getPersonalityScore = (candidate) =>
  candidate?.personalityScore ?? candidate?.personality ?? "-";

export const getCompositeScore = (candidate) =>
  Number(
    candidate?.overallScore ??
      Number(candidate?.technicalScore || 0) +
        Number(candidate?.personalityScore || 0)
  );

export const isReadyForEvaluation = (candidate) => {
  const stage = normalizeStage(candidate?.currentStage, candidate);

  return (
    stage === SELECTOR_STAGES.FINAL_REVIEW &&
    ["NOT_DECIDED", "PENDING", undefined, null].includes(candidate?.finalStatus)
  );
};

export const getStageBadgeVariant = (stage, candidate = {}) => {
  const normalized = normalizeStage(stage, candidate);

  if (
    [
      SELECTOR_STAGES.VERIFICATION_REJECTED,
      SELECTOR_STAGES.TECHNICAL_REJECTED,
      SELECTOR_STAGES.FINAL_REJECTED,
    ].includes(normalized)
  ) {
    return "danger";
  }

  if (
    [
      SELECTOR_STAGES.VERIFICATION_REVIEW,
      SELECTOR_STAGES.TECHNICAL_TEST_ASSIGNED,
      SELECTOR_STAGES.PERSONALITY_TEST_ASSIGNED,
      SELECTOR_STAGES.FINAL_REVIEW,
      SELECTOR_STAGES.WAITLISTED,
    ].includes(normalized)
  ) {
    return "warning";
  }

  if (
    [
      SELECTOR_STAGES.VERIFICATION_ELIGIBLE,
      SELECTOR_STAGES.TECHNICAL_QUALIFIED,
      SELECTOR_STAGES.SELECTED,
    ].includes(normalized)
  ) {
    return "success";
  }

  return "info";
};

export const canScheduleTechnicalTest = (candidate) =>
  normalizeStage(candidate?.currentStage, candidate) ===
    SELECTOR_STAGES.VERIFICATION_ELIGIBLE &&
  candidate?.verificationStatus === "ELIGIBLE";

export const canSetTechnicalCutoff = (candidate) =>
  normalizeStage(candidate?.currentStage, candidate) ===
    SELECTOR_STAGES.TECHNICAL_TEST_SUBMITTED ||
  candidate?.technicalTestStatus === "SUBMITTED";

export const canSchedulePersonalityTest = (candidate) =>
  normalizeStage(candidate?.currentStage, candidate) ===
  SELECTOR_STAGES.TECHNICAL_QUALIFIED;

export const isFinalDecisionCompleted = (candidate) =>
  [
    SELECTOR_STAGES.SELECTED,
    SELECTOR_STAGES.WAITLISTED,
    SELECTOR_STAGES.FINAL_REJECTED,
  ].includes(normalizeStage(candidate?.currentStage, candidate));