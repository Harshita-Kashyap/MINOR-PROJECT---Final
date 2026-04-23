const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveProfile,
  getMyProfile,
} = require("../controllers/applicantProfileController");

// ✅ SAVE PROFILE
router.post("/profile", protect, saveProfile);

// ✅ GET PROFILE
router.get("/profile", protect, getMyProfile);

module.exports = router;