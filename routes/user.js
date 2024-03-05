const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// 렌더링, get요청
router.get("/", controller.main);
// GET /login
router.get("/user/login", controller.getLogin);
// GET /join
router.get("/user/join", controller.getJoin);
// POST /login
router.post("/user/login", controller.postLogin);
// POST /join
router.post("/user/join", controller.postJoin);
// GET /logout
router.get("/user/logout", controller.getLogout);
// GET /header
router.post("/include/header", controller.getHeader);


module.exports = router;