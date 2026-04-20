const express = require("express");
const router = express.Router();
const { applyJob, getApplications } = require("../controllers/applicationController");
const auth = require("../middleware/authMiddleware"); // ✅ ADD THIS

// ✅ APPLY (protected)
router.post("/apply", auth, applyJob);

// ✅ GET APPLICATIONS (protected)
router.get("/", auth, getApplications);

module.exports = router;