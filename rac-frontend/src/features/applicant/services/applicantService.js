import {
  getApplications,
  getLatestActiveApplication,
} from "../../../shared/utils/applicationStorage";

export function getApplicantApplications() {
  return getApplications();
}

export function getApplicantLatestApplication() {
  return getLatestActiveApplication();
}