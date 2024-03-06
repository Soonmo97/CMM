const express = require("express");
const router = express.Router();
const controller = require("../controller/CresDetail");

// GET /restaurantDetail/:restIndex
// restIndex 상세페이지 조회
router.get("/:restIndex", controller.getRestDetail);

// GET /restaurantDetail/:restIndex/createLike
// 즐겨찾기 등록
// router.get("/:restIndex/selectLike", controller.getcreateLike);

module.exports = router;
