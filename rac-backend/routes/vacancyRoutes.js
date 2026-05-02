const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
  updateVacancyStatus,
  publishVacancy,
  closeVacancy,
  getVacancyApplicationProgress,
} = require("../controllers/vacancyController");

// Public/applicant/selector readable
router.get("/", getAllVacancies);
router.get("/:id", getVacancyById);
router.get("/:id/progress", protect, authorize("admin", "selector"), getVacancyApplicationProgress);

// Admin-only vacancy management
router.post("/", protect, authorize("admin"), createVacancy);
router.put("/:id", protect, authorize("admin"), updateVacancy);
router.delete("/:id", protect, authorize("admin"), deleteVacancy);

router.patch("/:id/status", protect, authorize("admin"), updateVacancyStatus);
router.patch("/:id/publish", protect, authorize("admin"), publishVacancy);
router.patch("/:id/close", protect, authorize("admin"), closeVacancy);

module.exports = router;