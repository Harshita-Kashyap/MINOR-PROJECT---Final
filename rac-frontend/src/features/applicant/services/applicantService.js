const BASE_URL = "http://localhost:5000/api";

// ================= COMMON =================

const getToken = () => localStorage.getItem("token");

const authHeader = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ================= PROFILE =================

// ✅ SAVE PROFILE
export const saveApplicantProfile = async (form) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.message || "Failed to save profile");
  }

  return data;
};

// ✅ GET PROFILE
export const getApplicantProfile = async () => {
  const res = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: authHeader(),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};

// ================= APPLICATION =================

// ✅ APPLY
export const applyToVacancy = async (vacancyId) => {
  const res = await fetch("http://localhost:5000/api/applications", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ vacancyId }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};
// ✅ GET MY APPLICATIONS
// ✅ ADD THIS
export const getApplicantApplications = async () => {
  const res = await fetch("http://localhost:5000/api/applications/my", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.applications;
};

export const getApplicationById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/applications/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.application;
};

export const getTechnicalTestByApplication = async (applicationId) => {
  const res = await fetch(
    `http://localhost:5000/api/tests/technical/${applicationId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};

export const submitTechnicalTest = async (applicationId, answers) => {
  const res = await fetch(
    `http://localhost:5000/api/tests/technical/${applicationId}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ answers }),
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};