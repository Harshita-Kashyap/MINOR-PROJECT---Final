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

module.exports = router;