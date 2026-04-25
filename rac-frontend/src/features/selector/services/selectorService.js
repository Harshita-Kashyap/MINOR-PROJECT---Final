import API from "../../../shared/services/api";

// Dashboard
export const getSelectorDashboard = async () => {
  const res = await API.get("/api/selector/dashboard");
  return res.data;
};

// Candidates list
export const getSelectorCandidates = async (params = {}) => {
  const res = await API.get("/api/selector/candidates", { params });
  return res.data;
};

// Single candidate
export const getSelectorCandidateById = async (id) => {
  const res = await API.get(`/api/selector/candidates/${id}`);
  return res.data;
};

// Analytics
export const getSelectorAnalytics = async () => {
  const res = await API.get("/api/selector/analytics");
  return res.data;
};

// Submit evaluation
export const submitEvaluation = async (data) => {
  const res = await API.post("/api/selector/evaluation", data);
  return res.data;
};