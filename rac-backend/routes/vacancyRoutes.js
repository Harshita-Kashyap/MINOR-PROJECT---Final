// routes/vacancyRoutes.js

const express = require("express");
const router = express.Router();

const {protect }= require("../middleware/authMiddleware");
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
} = require("../controllers/vacancyController");

// ========================
// 🔓 PUBLIC ROUTES
// ========================

// Get all vacancies (for applicants)
router.get("/", getAllVacancies);

// Get single vacancy
router.get("/:id", getVacancyById);

// ========================
// 🔒 ADMIN ROUTES
// ========================

// Create vacancy
router.post("/", protect, authorize("admin"), createVacancy);

// Update vacancy
router.put("/:id", protect, authorize("admin"), updateVacancy);

// Delete vacancy
router.delete("/:id", protect, authorize("admin"), deleteVacancy);

// Update vacancy status
router.put("/status/:id", protect, authorize("admin"), updateVacancyStatus);

// Publish vacancy
router.put("/publish/:id", protect, authorize("admin"), publishVacancy);

// Close vacancy
router.put("/close/:id", protect, authorize("admin"), closeVacancy);

module.exports = router;