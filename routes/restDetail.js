const express = require("express");
const router = express.Router();
const controller = require("../controller/CresDetail");

// GET /resaurantDetail/:resIndex
router.get("/:restIndex", controller.getRestDetail);

module.exports = router;
