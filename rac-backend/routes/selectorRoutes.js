// routes/selectorRoutes

const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  getSelectorDashboard,
  getSelectorCandidates,
  getSelectorCandidateById,
  getSelectorAnalytics,
  submitSelectorEvaluation,
} = require("../controllers/selectorController");

// ===============================
// 🔒 Protect all selector routes
// ===============================
router.use(protect, authorize("selector", "admin"));

// ===============================
// 📊 Dashboard
// ===============================
router.get("/dashboard", getSelectorDashboard);

// ===============================
// 📋 Candidates
// ===============================
router.get("/candidates", getSelectorCandidates);

// ===============================
// 👤 Candidate by ID
// ===============================
router.get("/candidates/:id", getSelectorCandidateById);

// ===============================
// 📈 Analytics
// ===============================
router.get("/analytics", getSelectorAnalytics);

// ===============================
// 🧑‍⚖️ Submit Evaluation
// ===============================
router.post("/evaluation", submitSelectorEvaluation);

module.exports = router;