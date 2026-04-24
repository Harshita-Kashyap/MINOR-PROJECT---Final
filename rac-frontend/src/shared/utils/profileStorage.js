const PROFILE_KEY = "applicantProfile";
const PROFILE_COMPLETE_KEY = "applicantProfileComplete";

export function saveApplicantProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getApplicantProfile() {
  return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
}

export function setProfileComplete(value) {
  localStorage.setItem(PROFILE_COMPLETE_KEY, value ? "true" : "false");
}

export const isProfileComplete = () => {
  return localStorage.getItem("profileComplete") === "true";
};

export function getApplicantName() {
  const profile = getApplicantProfile();
  if (profile?.fullName?.trim()) return profile.fullName.trim();

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name?.trim()) return user.name.trim();
  } catch {
    return "Applicant";
  }

  return "Applicant";
}