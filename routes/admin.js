const express = require("express");
const router = express.Router();
const controller = require("../controller/Cadmin");

// 관리자 페이지 요청
router.get("/", controller.getAdminPage);
router.get("/restaurants", controller.getAdminPage);

// 식당 추가 페이지 요청
router.get("/addRestaurant", controller.getAddPage);
// 식당 메뉴 추가 페이지 요청
router.get("/addRestaurantMenu", controller.getAddMenuPage);
// 식당 수정 페이지 요청
router.get("/editRestaurant", controller.getEditPage);

// 전체 식당 정보 조회
router.post("/getRestInfo", controller.getRestInfo);
// 특정 식당 삭제
router.post("/deleteRestaurant", controller.deleteRest);
// 식당 정보 수정
router.post("/editRestInfo", controller.editRestInfo);
// 식당 추가
router.post("/addRestaurant", controller.addRest);
module.exports = router;
// 식당 메뉴 추가
router.post("/addMenu", controller.addMenu);
