const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveProfile,
  getMyProfile,
} = require("../controllers/applicantProfileController");

// ✅ SAVE PROFILE
router.post("/", protect, saveProfile);

// ✅ GET PROFILE
router.get("/", protect, getMyProfile);

module.exports = router;