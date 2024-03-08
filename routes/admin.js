const express = require("express");
const router = express.Router();
const controller = require("../controller/Cadmin");

router.get("/", controller.getAdminPage);
router.get("/restaurants", controller.getAdminPage);

router.post("/getRestInfo", controller.getRestInfo);
router.post("/deleteRest", controller.deleteRest);
router.post("/editRestInfo", controller.editRestInfo);

module.exports = router;
