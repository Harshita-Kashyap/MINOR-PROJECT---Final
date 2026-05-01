const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  getTechnicalTestForApplication,
  submitTechnicalTest,
  getPersonalityTestForApplication,
  submitPersonalityTest,
} = require("../controllers/testController");

router.get(
  "/technical/:applicationId",
  protect,
  authorize("applicant"),
  getTechnicalTestForApplication
);

router.post(
  "/technical/:applicationId/submit",
  protect,
  authorize("applicant"),
  submitTechnicalTest
);

router.get(
  "/personality/:applicationId",
  protect,
  authorize("applicant"),
  getPersonalityTestForApplication
);

router.post(
  "/personality/:applicationId/submit",
  protect,
  authorize("applicant"),
  submitPersonalityTest
);

module.exports = router;