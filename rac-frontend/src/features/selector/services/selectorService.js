import API from "../../../shared/services/api";

export const getSelectorDashboard = async () => {
  const res = await API.get("/api/selector/dashboard");
  return res.data;
};

export const getSelectorCandidates = async (params = {}) => {
  const res = await API.get("/api/selector/candidates", { params });
  return res.data;
};

export const getSelectorCandidateById = async (_id) => {
  if (!_id || _id === "1") {
    throw new Error(`Invalid candidate id received: ${_id}`);
  }

  const res = await API.get(`/api/selector/candidates/${_id}`);
  return res.data;
};

export const getSelectorAnalytics = async () => {
  const res = await API.get("/api/selector/analytics");
  return res.data;
};

export const submitEvaluation = async (data) => {
  const res = await API.post("/api/selector/evaluation", data);
  return res.data;
};