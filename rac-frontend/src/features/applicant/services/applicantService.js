import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// ✅ get token
const getToken = () => localStorage.getItem("token");

// ✅ COMMON HEADERS
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});


// ================= APPLICATIONS =================

// ✅ GET ALL APPLICATIONS
export const getApplicantApplications = async () => {
  const res = await axios.get(
    `${BASE_URL}/applications`,
    authHeader()
  );
  return res.data;
};


// ✅ APPLY TO VACANCY
export const applyToVacancy = async (vacancyId) => {
  const res = await axios.post(
    `${BASE_URL}/applications`,
    { vacancyId },
    authHeader()
  );
  return res.data;
};



// ================= PROFILE =================

// ✅ SAVE PROFILE
export const saveApplicantProfile = async (data) => {
  const res = await axios.post(
    `${BASE_URL}/applicant/profile`,
    data,
    authHeader()
  );
  return res.data;
};


// ✅ GET PROFILE
export const getApplicantProfile = async () => {
  const res = await axios.get(
    `${BASE_URL}/applicant/profile`,
    authHeader()
  );
  return res.data;
};