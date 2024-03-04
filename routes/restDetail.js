const express = require("express");
const router = express.Router();
const controller = require("../controller/CresDetail");

// GET /restaurantDetail/:resIndex
router.get("/:restIndex", controller.getRestDetail);

module.exports = router;
