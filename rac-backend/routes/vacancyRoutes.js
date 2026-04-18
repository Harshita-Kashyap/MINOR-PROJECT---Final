const express = require("express");
const router = express.Router();
const { createVacancy, getVacancies } = require("../controllers/vacancyController");

router.post("/", createVacancy);
router.get("/", getVacancies);

module.exports = router;