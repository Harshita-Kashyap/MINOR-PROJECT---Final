import API from "../../../shared/services/api";

/* ===============================
   ADMIN DASHBOARD
================================ */

export const getAdminDashboardStats = () =>
  API.get("/api/admin/dashboard");

/* ===============================
   ADMIN ANALYTICS
================================ */

export const getAdminAnalytics = () =>
  API.get("/api/admin/analytics");

/* ===============================
   READ-ONLY APPLICATION MONITORING
================================ */

export const getAdminApplications = (params = {}) =>
  API.get("/api/admin/applications", { params });

export const getAdminApplicationById = (id) =>
  API.get(`/api/admin/applications/${id}`);

/* ===============================
   USER MANAGEMENT
================================ */

export const getAdminUsers = (params = {}) =>
  API.get("/api/admin/users", { params });

export const getAdminUserById = (id) =>
  API.get(`/api/admin/users/${id}`);

export const createAdminUser = (data) =>
  API.post("/api/admin/users", data);

export const updateAdminUserStatus = (id, isActive) =>
  API.patch(`/api/admin/users/${id}/status`, { isActive });

export const deleteAdminUser = (id) =>
  API.delete(`/api/admin/users/${id}`);