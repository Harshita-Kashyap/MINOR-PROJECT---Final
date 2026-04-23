const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// ✅ TEMP SAFE CONTROLLER (NO CRASH)
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
console.log("protect:", protect);
module.exports = router;