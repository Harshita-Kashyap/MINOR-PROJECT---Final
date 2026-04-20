import API from "../../../shared/services/api";

/* ===============================
   📌 VACANCY MANAGEMENT (CORE)
================================ */

// Get all vacancies (admin view)
export const getVacancies = (params = {}) =>
  API.get("/vacancies", { params });

// Get single vacancy
export const getVacancyById = (id) =>
  API.get(`/vacancies/${id}`);

// Create new vacancy
export const createVacancy = (data) =>
  API.post("/vacancies", data);

// Update vacancy
export const updateVacancy = (id, data) =>
  API.put(`/vacancies/${id}`, data);

// Delete vacancy
export const deleteVacancy = (id) =>
  API.delete(`/vacancies/${id}`);


/* ===============================
   📌 VACANCY WORKFLOW CONTROL
================================ */

// Activate / Deactivate vacancy
export const toggleVacancyStatus = (id, status) =>
  API.put(`/vacancies/${id}/status`, { status });


// Publish vacancy (visible to applicants)
export const publishVacancy = (id) =>
  API.put(`/vacancies/${id}/publish`);


// Close vacancy (stop accepting applications)
export const closeVacancy = (id) =>
  API.put(`/vacancies/${id}/close`);


/* ===============================
   📌 ANALYTICS RELATED
================================ */

// Get vacancy-wise analytics
export const getVacancyAnalytics = (id) =>
  API.get(`/vacancies/${id}/analytics`);


// Get overall admin analytics
export const getAdminAnalytics = () =>
  API.get(`/admin/analytics`);


/* ===============================
   📌 APPLICATION LINKED (ADMIN)
================================ */

// Get applications for a vacancy
export const getApplicationsByVacancy = (vacancyId) =>
  API.get(`/applications/vacancy/${vacancyId}`);


// Bulk shortlist (admin trigger)
export const shortlistCandidates = (vacancyId, criteria) =>
  API.post(`/applications/shortlist`, {
    vacancyId,
    criteria,
  });


// Generate merit list
export const generateMeritList = (vacancyId) =>
  API.post(`/merit-list/generate`, { vacancyId });


// Publish results
export const publishResults = (vacancyId) =>
  API.post(`/merit-list/publish`, { vacancyId });