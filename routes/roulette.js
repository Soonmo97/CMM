const express = require("express");
const router = express.Router();
const controller = require("../controller/Croulette.js");

// GET /roulette
// 룰렛 페이지
router.get("/", controller.getRoulette);

module.exports = router;
