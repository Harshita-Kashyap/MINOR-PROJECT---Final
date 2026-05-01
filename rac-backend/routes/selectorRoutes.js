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
  scheduleTechnicalTest,
  getTechnicalResultsByVacancy,
  setTechnicalCutoff,
  schedulePersonalityTest,} = require("../controllers/selectorController");

// ===============================
// 🔒 Protect all selector routes
// ===============================
router.use(protect, authorize("selector", "admin"));

router.get("/dashboard", getSelectorDashboard);

router.get("/candidates", getSelectorCandidates);

router.post("/tests/schedule-technical", scheduleTechnicalTest);

router.get("/technical-results/:vacancyId", getTechnicalResultsByVacancy);

router.post("/technical-cutoff", setTechnicalCutoff);

router.get("/candidates/:id", getSelectorCandidateById);

router.get("/analytics", getSelectorAnalytics);

router.post("/evaluation", submitSelectorEvaluation);

router.post("/tests/schedule-personality", schedulePersonalityTest);

module.exports = router;