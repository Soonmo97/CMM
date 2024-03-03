const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// 렌더링, get요청
router.get("/", controller.main);
// GET /login
router.get("/login", controller.getLogin);
// GET /join
router.get("/join", controller.getJoin);
// POST /login
router.post("/login", controller.postLogin);
// POST /join
router.post("/join", controller.postJoin);


module.exports = router;