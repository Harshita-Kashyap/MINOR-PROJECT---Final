import { APPLICATION_STAGES } from "../../features/applicant/utils/applicantHelpers";

const APPLICATIONS_KEY = "applications";

export function getApplications() {
  return JSON.parse(localStorage.getItem(APPLICATIONS_KEY)) || [];
}

export function saveApplications(applications) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

export function hasApplied(vacancyId) {
  const applications = getApplications();
  return applications.some((item) => item.vacancyId === vacancyId);
}

export function getApplicationByVacancyId(vacancyId) {
  const applications = getApplications();
  return applications.find((item) => item.vacancyId === vacancyId) || null;
}

export function getLatestActiveApplication() {
  const applications = getApplications();
  if (!applications.length) return null;

  return [...applications].sort(
    (a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt)
  )[0];
}

export function applyToVacancy(vacancy) {
  const applications = getApplications();

  const alreadyExists = applications.some(
    (item) => item.vacancyId === vacancy.id
  );
  if (alreadyExists) return false;

  const now = new Date().toISOString();

  const newApplication = {
    id: `APP-${Date.now()}`,
    vacancyId: vacancy.id,
    vacancyTitle: vacancy.title,
    department: vacancy.department,
    appliedAt: now,
    lastUpdatedAt: now,

    currentStage: APPLICATION_STAGES.VERIFICATION_PENDING,
    verificationStatus: "PENDING",
    verificationReason: "",

    technicalTestStatus: "NOT_ASSIGNED",
    technicalScore: null,
    technicalRemarks: "",

    personalityTestStatus: "NOT_ASSIGNED",
    personalityScore: null,
    personalityRemarks: "",

    finalStatus: "NOT_DECIDED",
    finalReason: "",

    nextAction: "Wait for profile verification",

    timeline: [
      {
        stage: APPLICATION_STAGES.APPLIED,
        label: "Application Submitted",
        date: now,
        note: "Application submitted successfully.",
      },
      {
        stage: APPLICATION_STAGES.VERIFICATION_PENDING,
        label: "Verification Pending",
        date: now,
        note: "Your profile details are being verified against eligibility criteria.",
      },
    ],
  };

  applications.unshift(newApplication);
  saveApplications(applications);
  return true;
}

export function updateApplication(applicationId, updates) {
  const applications = getApplications();

  const updatedApplications = applications.map((app) =>
    app.id === applicationId
      ? {
          ...app,
          ...updates,
          lastUpdatedAt: new Date().toISOString(),
        }
      : app
  );

  saveApplications(updatedApplications);
}

export function appendApplicationTimeline(applicationId, timelineEntry) {
  const applications = getApplications();

  const updatedApplications = applications.map((app) => {
    if (app.id !== applicationId) return app;

    return {
      ...app,
      timeline: [
        ...(app.timeline || []),
        {
          ...timelineEntry,
          date: timelineEntry.date || new Date().toISOString(),
        },
      ],
      lastUpdatedAt: new Date().toISOString(),
    };
  });

  saveApplications(updatedApplications);
}