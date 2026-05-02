const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  getAdminDashboardStats,
  getAdminAnalytics,
  getAdminApplications,
  getAdminApplicationById,
  getAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateUserStatus,
  deleteAdminUser,
} = require("../controllers/adminController");

router.use(protect);
router.use(authorize("admin"));

router.get("/dashboard", getAdminDashboardStats);
router.get("/analytics", getAdminAnalytics);

router.get("/applications", getAdminApplications);
router.get("/applications/:id", getAdminApplicationById);

router.get("/users", getAdminUsers);
router.get("/users/:id", getAdminUserById);
router.post("/users", createAdminUser);
router.patch("/users/:id/status", updateUserStatus);
router.delete("/users/:id", deleteAdminUser);

module.exports = router;