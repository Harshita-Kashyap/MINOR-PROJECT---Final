export const selectorCandidates = [
  {
    id: "1",
    cid: "RAC/2026/CS/001",
    name: "Aditi Sharma",
    email: "aditi@gmail.com",
    phone: "9876543210",
    vacancy: "Scientist B - Computer Science",
    department: "DRDO RAC",
    currentStage: "FINAL_REVIEW",
    verificationStatus: "ELIGIBLE",
    verificationReason: "",
    verificationScore: 82,
    profileScore: 82,
    gate: 650,
    technical: 78,
    personality: 70,
    overallScore: 230,
    status: "Final Review",
    skills: ["React", "Node", "MongoDB"],
    education: "B.Tech (CSE) - 8.5 CGPA",
    academics: {
      tenth: "91.2%",
      twelfth: "89.4%",
      graduation: "8.5 CGPA",
    },
    experience: "1 year internship",
    projects: "AI Resume Parser",
    remarks: "Strong technical and overall profile.",
  },
  {
    id: "2",
    cid: "RAC/2026/EC/002",
    name: "Rahul Verma",
    email: "rahul@gmail.com",
    phone: "9999999999",
    vacancy: "Scientist B - Electronics",
    department: "DRDO RAC",
    currentStage: "TECHNICAL_TEST_ASSIGNED",
    verificationStatus: "ELIGIBLE",
    verificationReason: "",
    verificationScore: 78,
    profileScore: 76,
    gate: 720,
    technical: 0,
    personality: 0,
    overallScore: 76,
    status: "Technical Assigned",
    skills: ["Embedded C", "VLSI", "MATLAB"],
    education: "B.Tech (ECE) - 8.1 CGPA",
    academics: {
      tenth: "88.0%",
      twelfth: "86.4%",
      graduation: "8.1 CGPA",
    },
    experience: "Fresher",
    projects: "IoT Defence Sensor Node",
    remarks: "",
  },
  {
    id: "3",
    cid: "RAC/2026/ME/003",
    name: "Neha Singh",
    email: "neha@gmail.com",
    phone: "8888888888",
    vacancy: "Scientist B - Mechanical",
    department: "DRDO RAC",
    currentStage: "VERIFICATION_REVIEW",
    verificationStatus: "REVIEW",
    verificationReason: "Minor mismatch in 12th verification details.",
    verificationScore: 61,
    profileScore: 71,
    gate: 600,
    technical: 0,
    personality: 0,
    overallScore: 71,
    status: "Under Review",
    skills: ["CAD", "SolidWorks", "Manufacturing"],
    education: "B.Tech (Mechanical) - 7.9 CGPA",
    academics: {
      tenth: "84.6%",
      twelfth: "82.1%",
      graduation: "7.9 CGPA",
    },
    experience: "Internship in production unit",
    projects: "Composite Material Design",
    remarks: "Verification review required before progression.",
  },
  {
    id: "4",
    cid: "RAC/2026/CS/004",
    name: "Vikas Meena",
    email: "vikas@gmail.com",
    phone: "7777777777",
    vacancy: "Scientist B - Computer Science",
    department: "DRDO RAC",
    currentStage: "VERIFICATION_REJECTED",
    verificationStatus: "REJECTED",
    verificationReason: "GATE score does not match verification record.",
    verificationScore: 42,
    profileScore: 64,
    gate: 540,
    technical: 0,
    personality: 0,
    overallScore: 64,
    status: "Rejected at Verification",
    skills: ["Python", "Flask"],
    education: "B.Tech (CSE) - 7.8 CGPA",
    academics: {
      tenth: "79.2%",
      twelfth: "81.0%",
      graduation: "7.8 CGPA",
    },
    experience: "Fresher",
    projects: "College ERP",
    remarks: "Verification rejected by system.",
  },
];

export function getSelectorCandidates() {
  return selectorCandidates;
}

export function getSelectorCandidateById(id) {
  return selectorCandidates.find((candidate) => candidate.id === id) || null;
}

export function getSelectorDashboardStats() {
  const candidates = getSelectorCandidates();

  return {
    totalApplied: candidates.length,
    verificationReview: candidates.filter(
      (c) => c.currentStage === "VERIFICATION_REVIEW"
    ).length,
    verificationRejected: candidates.filter(
      (c) => c.currentStage === "VERIFICATION_REJECTED"
    ).length,
    technicalAssigned: candidates.filter(
      (c) => c.currentStage === "TECHNICAL_TEST_ASSIGNED"
    ).length,
    technicalShortlisted: candidates.filter(
      (c) => c.currentStage === "PERSONALITY_TEST_ASSIGNED"
    ).length,
    finalReview: candidates.filter((c) => c.currentStage === "FINAL_REVIEW")
      .length,
  };
}