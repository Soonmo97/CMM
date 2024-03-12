const express = require("express");
const router = express.Router();
const controller = require("../controller/Cadmin");

// 관리자 페이지 요청
router.get("/", controller.getAdminPage);
router.get("/restaurants", controller.getAdminPage);

// 회원 관리 페이지 요청
router.get("/users", controller.getAdminUserPage);

// 식당 등록 페이지 요청
router.get("/addRestaurant", controller.getAddPage);
// 식당 메뉴 등록 페이지 요청
router.get("/addRestaurantMenu", controller.getAddMenuPage);
// 식당 수정 페이지 요청
router.get("/editRestaurant", controller.getEditPage);

// 전체 식당 정보 조회
router.post("/getRestInfo", controller.getRestInfo);
// 식당 등록
router.post("/addRestaurant", controller.addRest);
// 식당 메뉴 추가
router.post("/addMenu", controller.addMenu);
// 특정 식당 삭제
router.delete("/deleteRestaurant", controller.deleteRest);
// 식당 정보 수정
router.post("/editRestInfo", controller.editRestInfo);
// 식당 카테고리 수정
router.post("/editRestCategory", controller.editRestCategory);
// 식당 메뉴 수정
router.post("/editRestMenu", controller.editRestMenu);
// 회원 삭제
router.delete("/deleteUser", controller.deleteUser);

module.exports = router;
