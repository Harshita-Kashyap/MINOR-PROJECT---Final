// src/utils/profileStorage.js
export function isProfileComplete() {
  return localStorage.getItem("applicantProfileComplete") === "true";
}

export function getApplicantProfile() {
  return JSON.parse(localStorage.getItem("applicantProfile")) || null;
}