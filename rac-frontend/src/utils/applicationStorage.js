// src/utils/applicationStorage.js
export function getApplications() {
  return JSON.parse(localStorage.getItem("applications")) || [];
}

export function saveApplications(applications) {
  localStorage.setItem("applications", JSON.stringify(applications));
}

export function hasApplied(vacancyId) {
  const applications = getApplications();
  return applications.some((item) => item.id === vacancyId);
}

export function applyToVacancy(vacancy) {
  const applications = getApplications();

  const alreadyExists = applications.some((item) => item.id === vacancy.id);
  if (alreadyExists) return false;

  const newApplication = {
    id: vacancy.id,
    vacancy: vacancy.title,
    department: vacancy.department,
    appliedDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    stage: "Applied",
    technical: "Not Started",
    personality: "Not Started",
    final: "-",
  };

  applications.push(newApplication);
  saveApplications(applications);
  return true;
}