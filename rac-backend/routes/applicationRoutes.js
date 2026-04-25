const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  apply,
  getMyApplications,
  getApplicationById,
  getAllApplications,
  getApplicationsByVacancy,
  updateVerification,
  updateTechnicalResult,
  updateFinalResult,
  shortlistCandidates,
  generateMeritList,
} = require("../controllers/applicationController");

// Applicant
router.post("/", protect, authorize("applicant"), apply);
router.get("/my", protect, authorize("applicant"), getMyApplications);

// Admin / Selector
router.get("/", protect, authorize("admin", "selector"), getAllApplications);
router.get(
  "/vacancy/:vacancyId",
  protect,
  authorize("admin", "selector"),
  getApplicationsByVacancy
);

router.put(
  "/:id/verification",
  protect,
  authorize("admin", "selector"),
  updateVerification
);

router.put(
  "/:id/technical",
  protect,
  authorize("admin", "selector"),
  updateTechnicalResult
);

router.put(
  "/:id/final",
  protect,
  authorize("admin", "selector"),
  updateFinalResult
);

router.post(
  "/shortlist",
  protect,
  authorize("admin", "selector"),
  shortlistCandidates
);

router.post(
  "/merit-list/generate",
  protect,
  authorize("admin", "selector"),
  generateMeritList
);

// Keep this near bottom
router.get(
  "/:id",
  protect,
  authorize("applicant", "admin", "selector"),
  getApplicationById
);

module.exports = router;