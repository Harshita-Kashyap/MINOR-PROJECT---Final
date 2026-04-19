import API from "../../../shared/services/api";

// GET all vacancies
export const getVacancies = () => API.get("/vacancies");

// CREATE
export const createVacancy = (data) => API.post("/vacancies", data);

// UPDATE
export const updateVacancy = (id, data) =>
  API.put(`/vacancies/${id}`, data);

// DELETE
export const deleteVacancy = (id) =>
  API.delete(`/vacancies/${id}`);