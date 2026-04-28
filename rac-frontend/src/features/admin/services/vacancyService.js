import API from "../../../shared/services/api";

/* ===============================
   📌 VACANCY MANAGEMENT (CORE)
================================ */

// Get all vacancies (admin view)
export const getVacancies = (params = {}) =>
  API.get("/api/vacancies", { params });

// Get single vacancy
export const getVacancyById = (id) =>
  API.get(`/api/vacancies/${id}`);

// Create new vacancy
export const createVacancy = (data) =>
  API.post("/api/vacancies", data);

// Update vacancy
export const updateVacancy = (id, data) =>
  API.put(`/api/vacancies/${id}`, data);

// Delete vacancy
export const deleteVacancy = (id) =>
  API.delete(`/api/vacancies/${id}`);


/* ===============================
   📌 VACANCY WORKFLOW CONTROL
================================ */

// Activate / Deactivate vacancy
export const toggleVacancyStatus = (id, status) =>
  API.put(`/api/vacancies/status/${id}`, { status });

export const publishVacancy = (id) =>
  API.put(`/api/vacancies/publish/${id}`);

export const closeVacancy = (id) =>
  API.put(`/api/vacancies/close/${id}`);


/* ===============================
   📌 ANALYTICS RELATED
================================ */

// Get vacancy-wise analytics
export const getVacancyAnalytics = (id) =>
  API.get(`/api/vacancies/${id}/analytics`);

// Get overall admin analytics
export const getAdminAnalytics = () =>
  API.get(`/api/admin/analytics`);


/* ===============================
   📌 APPLICATION MANAGEMENT
================================ */

// Get all applications
export const getAllApplications = () =>
  API.get("/api/applications");

// Get applications by vacancy
export const getApplicationsByVacancy = (vacancyId) =>
  API.get(`/api/applications/vacancy/${vacancyId}`);

// Update verification status
export const updateApplicationVerification = (id, data) =>
  API.put(`/api/applications/${id}/verification`, data);

// Update technical round result
export const updateTechnicalResult = (id, data) =>
  API.put(`/api/applications/${id}/technical`, data);

// Update final result
export const updateFinalResult = (id, data) =>
  API.put(`/api/applications/${id}/final`, data);


/* ===============================
   📌 SHORTLIST & MERIT SYSTEM
================================ */

// Shortlist candidates
export const shortlistCandidates = (vacancyId, criteria = {}) =>
  API.post("/api/applications/shortlist", {
    vacancyId,
    criteria,
  });

// Generate merit list
export const generateMeritList = (vacancyId) =>
  API.post("/api/applications/merit-list/generate", { vacancyId });

// Publish results - backend pending
export const publishResults = (vacancyId) =>
  API.post(`/api/applications/merit-list/publish`, { vacancyId });