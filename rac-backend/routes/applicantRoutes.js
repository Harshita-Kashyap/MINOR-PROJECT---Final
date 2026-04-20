const express = require("express");
const router = express.Router();

const { getProfile, saveProfile } = require("../controllers/applicantController");
const { protect } = require("../middleware/authMiddleware");

// ✅ GET PROFILE
router.get("/profile", getProfile);

// ✅ SAVE PROFILE
router.post("/profile",  saveProfile);

module.exports = router;