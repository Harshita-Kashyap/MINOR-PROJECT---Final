export const APPLICATION_STAGES = {
  APPLIED: "APPLIED",
  VERIFICATION_PENDING: "VERIFICATION_PENDING",
  VERIFICATION_REVIEW: "VERIFICATION_REVIEW",
  VERIFICATION_REJECTED: "VERIFICATION_REJECTED",
  VERIFICATION_ELIGIBLE: "VERIFICATION_ELIGIBLE",

  TECHNICAL_TEST_ASSIGNED: "TECHNICAL_TEST_ASSIGNED",
  TECHNICAL_TEST_IN_PROGRESS: "TECHNICAL_TEST_IN_PROGRESS",
  TECHNICAL_TEST_SUBMITTED: "TECHNICAL_TEST_SUBMITTED",
  TECHNICAL_QUALIFIED: "TECHNICAL_QUALIFIED",
  TECHNICAL_SHORTLISTED: "TECHNICAL_SHORTLISTED",
  TECHNICAL_REJECTED: "TECHNICAL_REJECTED",

  PERSONALITY_TEST_ASSIGNED: "PERSONALITY_TEST_ASSIGNED",
  PERSONALITY_TEST_IN_PROGRESS: "PERSONALITY_TEST_IN_PROGRESS",
  PERSONALITY_TEST_SUBMITTED: "PERSONALITY_TEST_SUBMITTED",

  FINAL_REVIEW: "FINAL_REVIEW",
  SELECTED: "SELECTED",
  WAITLISTED: "WAITLISTED",
  FINAL_REJECTED: "FINAL_REJECTED",
};

export function formatStageName(stage) {
  if (!stage) return "Unknown Stage";

  return stage
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getStageLabel(stage) {
  const labels = {
    APPLIED: "Application Submitted",
    VERIFICATION_PENDING: "Verification Pending",
    VERIFICATION_REVIEW: "Under Review",
    VERIFICATION_REJECTED: "Rejected at Verification",
    VERIFICATION_ELIGIBLE: "Verification Eligible",

    TECHNICAL_TEST_ASSIGNED: "Technical Test Assigned",
    TECHNICAL_TEST_IN_PROGRESS: "Technical Test In Progress",
    TECHNICAL_TEST_SUBMITTED: "Technical Test Submitted",
    TECHNICAL_QUALIFIED: "Technical Qualified",
    TECHNICAL_SHORTLISTED: "Technical Qualified",
    TECHNICAL_REJECTED: "Rejected after Technical Test",

    PERSONALITY_TEST_ASSIGNED: "Personality Test Assigned",
    PERSONALITY_TEST_IN_PROGRESS: "Personality Test In Progress",
    PERSONALITY_TEST_SUBMITTED: "Personality Test Submitted",

    FINAL_REVIEW: "Final Review",
    SELECTED: "Selected",
    WAITLISTED: "Waitlisted",
    FINAL_REJECTED: "Not Selected",
  };

  return labels[stage] || formatStageName(stage);
}

export function getStageDescription(stage) {
  const descriptions = {
    APPLIED: "Application submitted successfully.",
    VERIFICATION_PENDING: "Profile verification started automatically.",
    VERIFICATION_REVIEW: "Application is under manual review.",
    VERIFICATION_REJECTED: "Application was rejected during eligibility verification.",
    VERIFICATION_ELIGIBLE: "Candidate verified as eligible.",

    TECHNICAL_TEST_ASSIGNED: "Technical test assigned by selector.",
    TECHNICAL_TEST_IN_PROGRESS: "Technical test is in progress.",
    TECHNICAL_TEST_SUBMITTED: "Technical test submitted.",
    TECHNICAL_QUALIFIED: "Qualified technical cutoff.",
    TECHNICAL_SHORTLISTED: "Qualified technical cutoff.",
    TECHNICAL_REJECTED: "Candidate did not qualify the technical cutoff.",

    PERSONALITY_TEST_ASSIGNED: "Personality test assigned by selector.",
    PERSONALITY_TEST_IN_PROGRESS: "Personality test is in progress.",
    PERSONALITY_TEST_SUBMITTED: "Personality test submitted.",

    FINAL_REVIEW: "Application moved to final review.",
    SELECTED: "Candidate selected after final review.",
    WAITLISTED: "Candidate waitlisted after final review.",
    FINAL_REJECTED: "Candidate not selected after final review.",
  };

  return descriptions[stage] || "Application stage updated.";
}

export function getStageTone(stage) {
  if (
    [
      APPLICATION_STAGES.VERIFICATION_REJECTED,
      APPLICATION_STAGES.TECHNICAL_REJECTED,
      APPLICATION_STAGES.FINAL_REJECTED,
    ].includes(stage)
  ) {
    return "danger";
  }

  if (
    [
      APPLICATION_STAGES.VERIFICATION_REVIEW,
      APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
      APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
      APPLICATION_STAGES.WAITLISTED,
    ].includes(stage)
  ) {
    return "warning";
  }

  if (
    [
      APPLICATION_STAGES.VERIFICATION_ELIGIBLE,
      APPLICATION_STAGES.TECHNICAL_QUALIFIED,
      APPLICATION_STAGES.TECHNICAL_SHORTLISTED,
      APPLICATION_STAGES.SELECTED,
    ].includes(stage)
  ) {
    return "success";
  }

  return "info";
}

export function getNextAction(app) {
  switch (app?.currentStage) {
    case APPLICATION_STAGES.APPLIED:
    case APPLICATION_STAGES.VERIFICATION_PENDING:
      return "Wait for eligibility verification";

    case APPLICATION_STAGES.VERIFICATION_ELIGIBLE:
      return "Wait for technical test assignment";

    case APPLICATION_STAGES.VERIFICATION_REVIEW:
      return "Application is under manual review";

    case APPLICATION_STAGES.VERIFICATION_REJECTED:
      return "View verification result";

    case APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED:
      return "Start technical test";

    case APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS:
      return "Continue technical test";

    case APPLICATION_STAGES.TECHNICAL_TEST_SUBMITTED:
      return "Wait for technical cutoff result";

    case APPLICATION_STAGES.TECHNICAL_QUALIFIED:
    case APPLICATION_STAGES.TECHNICAL_SHORTLISTED:
      return "Wait for personality test assignment";

    case APPLICATION_STAGES.TECHNICAL_REJECTED:
      return "View technical result";

    case APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED:
      return "Start personality test";

    case APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS:
      return "Continue personality test";

    case APPLICATION_STAGES.PERSONALITY_TEST_SUBMITTED:
      return "Wait for final review";

    case APPLICATION_STAGES.FINAL_REVIEW:
      return "Final decision pending";

    case APPLICATION_STAGES.SELECTED:
    case APPLICATION_STAGES.WAITLISTED:
    case APPLICATION_STAGES.FINAL_REJECTED:
      return "View final result";

    default:
      return "Track application progress";
  }
}

export function isFinalStage(stage) {
  return [
    APPLICATION_STAGES.SELECTED,
    APPLICATION_STAGES.WAITLISTED,
    APPLICATION_STAGES.FINAL_REJECTED,
  ].includes(stage);
}

export function getFinalResultLabel(stage) {
  if (stage === APPLICATION_STAGES.SELECTED) return "Selected";
  if (stage === APPLICATION_STAGES.WAITLISTED) return "Waitlisted";
  if (stage === APPLICATION_STAGES.FINAL_REJECTED) return "Not Selected";
  return "Final Result Pending";
}

export function canAccessTechnicalTest(application) {
  return [
    APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
    APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
  ].includes(application?.currentStage);
}

export function canAccessPersonalityTest(application) {
  return [
    APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
    APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
  ].includes(application?.currentStage);
}

export function normalizeStage(stage) {
  if (!stage) return APPLICATION_STAGES.APPLIED;

  const value = String(stage).trim().toUpperCase();

  const legacyMap = {
    TECHNICAL: APPLICATION_STAGES.VERIFICATION_ELIGIBLE,
    VERIFICATION: APPLICATION_STAGES.VERIFICATION_PENDING,
    ELIGIBLE: APPLICATION_STAGES.VERIFICATION_ELIGIBLE,
    REVIEW: APPLICATION_STAGES.VERIFICATION_REVIEW,
    REJECTED: APPLICATION_STAGES.VERIFICATION_REJECTED,
    FINAL: APPLICATION_STAGES.FINAL_REVIEW,
  };

  return legacyMap[value] || value;
}