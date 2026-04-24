// routes/applicationRoutes

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
console.log("authorize value:", authorize);
const {
  apply,
  getMyApplications,
  getApplicationById,
  getAllApplications,
} = require("../controllers/applicationController");

// ========================
// 📝 APPLY (Applicant)
// ========================
router.post("/", protect, authorize("applicant"), apply);

// ========================
// 📄 GET MY APPLICATIONS (Applicant)
// ========================
router.get("/my", protect, authorize("applicant"), getMyApplications);

// ========================
// 👤 GET SINGLE APPLICATION
// (Applicant → own, Admin/Selector → any)
// ========================
router.get(
  "/:id",
  protect,
  authorize("applicant", "admin", "selector"),
  getApplicationById
);

// ========================
// 📋 GET ALL APPLICATIONS
// (Admin + Selector)
// ========================
router.get(
  "/",
  protect,
  authorize("admin", "selector"),
  getAllApplications
);

module.exports = router;