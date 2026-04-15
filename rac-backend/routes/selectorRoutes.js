const express = require("express");
const router = express.Router();
const { updateStatus } = require("../controllers/selectorController");

router.put("/status", updateStatus);

module.exports = router;