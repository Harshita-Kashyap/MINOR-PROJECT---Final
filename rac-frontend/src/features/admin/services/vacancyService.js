import API from "../../../shared/services/api";

/* ===============================
   VACANCY MANAGEMENT
================================ */

export const getVacancies = (params = {}) =>
  API.get("/api/vacancies", { params });

export const getVacancyById = (id) =>
  API.get(`/api/vacancies/${id}`);

export const createVacancy = (data) =>
  API.post("/api/vacancies", data);

export const updateVacancy = (id, data) =>
  API.put(`/api/vacancies/${id}`, data);

export const deleteVacancy = (id) =>
  API.delete(`/api/vacancies/${id}`);

/* ===============================
   VACANCY STATUS CONTROL
================================ */

export const updateVacancyStatus = (id, status) =>
  API.patch(`/api/vacancies/${id}/status`, { status });

export const publishVacancy = (id) =>
  API.patch(`/api/vacancies/${id}/publish`);

export const closeVacancy = (id) =>
  API.patch(`/api/vacancies/${id}/close`);

/* ===============================
   VACANCY PROGRESS MONITORING
================================ */

export const getVacancyApplicationProgress = (id) =>
  API.get(`/api/vacancies/${id}/progress`);