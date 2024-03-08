const express = require("express");
const router = express.Router();
const controller = require("../controller/CresDetail");

// GET /restaurantDetail/:restIndex
// restIndex 상세페이지 조회
router.get("/:restIndex", controller.getRestDetail);

// POST /restaurantDetail/:restIndex/createLike
// 즐겨찾기 등록
router.post("/:restIndex/createLike", controller.postCreateLike);

// DELETE /restaurantDetail/:restIndex/deleteLike
// 즐겨찾기 삭제
router.delete("/:restIndex/deleteLike", controller.deleteLike);

// GET /restaurantDetail/:restIndex/reviewPlus
// 리뷰 더보기
router.get("/:restIndex/reviewPlus", controller.getReviewPlus);

// POST /restaurantDetail/:restIndex/createReview
// 리뷰 등록
router.post("/:restIndex/createReview", controller.postCreateReview);

module.exports = router;
