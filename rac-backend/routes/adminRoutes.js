const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { getAdminAnalytics } = require("../controllers/adminController");

router.get("/analytics", protect, authorize("admin"), getAdminAnalytics);

module.exports = router;