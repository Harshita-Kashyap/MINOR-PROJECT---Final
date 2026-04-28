export const APPLICATION_STAGES = {
  APPLIED: "APPLIED",
  VERIFICATION_PENDING: "VERIFICATION_PENDING",
  VERIFICATION_REVIEW: "VERIFICATION_REVIEW",
  VERIFICATION_REJECTED: "VERIFICATION_REJECTED",
  VERIFICATION_ELIGIBLE: "VERIFICATION_ELIGIBLE",
  TECHNICAL_TEST_ASSIGNED: "TECHNICAL_TEST_ASSIGNED",
  TECHNICAL_TEST_IN_PROGRESS: "TECHNICAL_TEST_IN_PROGRESS",
  TECHNICAL_TEST_SUBMITTED: "TECHNICAL_TEST_SUBMITTED",
  TECHNICAL_SHORTLISTED: "TECHNICAL_SHORTLISTED",
  TECHNICAL_REJECTED: "TECHNICAL_REJECTED",
  PERSONALITY_TEST_ASSIGNED: "PERSONALITY_TEST_ASSIGNED",
  PERSONALITY_TEST_IN_PROGRESS: "PERSONALITY_TEST_IN_PROGRESS",
  PERSONALITY_TEST_SUBMITTED: "PERSONALITY_TEST_SUBMITTED",
  FINAL_REVIEW: "FINAL_REVIEW",
  MERIT_LISTED: "MERIT_LISTED",
  SELECTED: "SELECTED",
  WAITLISTED: "WAITLISTED",
  FINAL_REJECTED: "FINAL_REJECTED",
};

export function getStageLabel(stage) {
  const labels = {
    APPLIED: "Application Submitted",
    VERIFICATION_PENDING: "Verification Pending",
    VERIFICATION_REVIEW: "Under Review",
    VERIFICATION_REJECTED: "Rejected at Verification",
    VERIFICATION_ELIGIBLE: "Eligible",
    TECHNICAL_TEST_ASSIGNED: "Technical Test Assigned",
    TECHNICAL_TEST_IN_PROGRESS: "Technical Test In Progress",
    TECHNICAL_TEST_SUBMITTED: "Technical Test Submitted",
    TECHNICAL_SHORTLISTED: "Shortlisted for Personality Test",
    TECHNICAL_REJECTED: "Rejected after Technical Evaluation",
    PERSONALITY_TEST_ASSIGNED: "Personality Test Assigned",
    PERSONALITY_TEST_IN_PROGRESS: "Personality Test In Progress",
    PERSONALITY_TEST_SUBMITTED: "Personality Test Submitted",
    FINAL_REVIEW: "Final Review",
    MERIT_LISTED: "Merit Listed",
    SELECTED: "Selected",
    WAITLISTED: "Waitlisted",
    FINAL_REJECTED: "Not Selected",
  };

  return labels[stage] || "Unknown Stage";
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
      APPLICATION_STAGES.TECHNICAL_SHORTLISTED,
      APPLICATION_STAGES.SELECTED,
      APPLICATION_STAGES.MERIT_LISTED,
    ].includes(stage)
  ) {
    return "success";
  }

  if (
    [
      APPLICATION_STAGES.APPLIED,
      APPLICATION_STAGES.VERIFICATION_PENDING,
      APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
      APPLICATION_STAGES.TECHNICAL_TEST_SUBMITTED,
      APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
      APPLICATION_STAGES.PERSONALITY_TEST_SUBMITTED,
      APPLICATION_STAGES.FINAL_REVIEW,
    ].includes(stage)
  ) {
    return "info";
  }

  return "default";
}

export function getNextAction(application) {
  switch (application.currentStage) {
    case APPLICATION_STAGES.APPLIED:
    case APPLICATION_STAGES.VERIFICATION_PENDING:
      return "Wait for profile verification";

    case APPLICATION_STAGES.VERIFICATION_REVIEW:
      return "Track review updates";

    case APPLICATION_STAGES.VERIFICATION_ELIGIBLE:
      return "Wait for technical test assignment";

    case APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED:
      return "Start technical test";

    case APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS:
      return "Continue technical test";

    case APPLICATION_STAGES.TECHNICAL_TEST_SUBMITTED:
      return "Await technical evaluation";

    case APPLICATION_STAGES.TECHNICAL_SHORTLISTED:
      return "Wait for personality test assignment";

    case APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED:
      return "Start personality test";

    case APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS:
      return "Continue personality test";

    case APPLICATION_STAGES.PERSONALITY_TEST_SUBMITTED:
      return "Await final review";

    case APPLICATION_STAGES.MERIT_LISTED:
      return "View merit details";

    case APPLICATION_STAGES.SELECTED:
    case APPLICATION_STAGES.WAITLISTED:
    case APPLICATION_STAGES.FINAL_REJECTED:
    case APPLICATION_STAGES.VERIFICATION_REJECTED:
    case APPLICATION_STAGES.TECHNICAL_REJECTED:
      return "View result details";

    default:
      return "No action available";
  }
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

export function getDashboardSummary(applications = []) {
  const activeApplications = applications.filter(
    (app) =>
      ![
        APPLICATION_STAGES.SELECTED,
        APPLICATION_STAGES.FINAL_REJECTED,
        APPLICATION_STAGES.VERIFICATION_REJECTED,
        APPLICATION_STAGES.TECHNICAL_REJECTED,
      ].includes(app.currentStage)
  );

  const pendingActions = applications.filter((app) =>
    [
      APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
      APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
      APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
      APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
      APPLICATION_STAGES.VERIFICATION_REVIEW,
    ].includes(app.currentStage)
  ).length;

  const finalResults = applications.filter((app) =>
    [
      APPLICATION_STAGES.SELECTED,
      APPLICATION_STAGES.WAITLISTED,
      APPLICATION_STAGES.FINAL_REJECTED,
    ].includes(app.currentStage)
  ).length;

  const testsPending = applications.filter((app) =>
    [
      APPLICATION_STAGES.TECHNICAL_TEST_ASSIGNED,
      APPLICATION_STAGES.TECHNICAL_TEST_IN_PROGRESS,
      APPLICATION_STAGES.PERSONALITY_TEST_ASSIGNED,
      APPLICATION_STAGES.PERSONALITY_TEST_IN_PROGRESS,
    ].includes(app.currentStage)
  ).length;

  return {
    activeApplications: activeApplications.length,
    pendingActions,
    finalResults,
    testsPending,
  };
}