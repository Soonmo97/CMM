const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmypage");

// GET /mypage/likeList
// 내 즐겨찾기 조회
router.get("/likeList", controller.getLikeList);

// delete /mypage/likeList/deleteLike
// 좋아요 삭제
router.delete("/likeList/deleteLike", controller.deleteLike);

// POST /mypage/likeList/createLike
// 좋아요 등록
router.post("/likeList/createLike", controller.createLike);

// GET /mypage/reviewList
// 내 리뷰 조회
router.get("/reviewList", controller.getReviewList);

// GET /mypage/reviewList/:reviewIndex
// 내 리뷰 상세
router.get("/reviewList/:reviewIndex", controller.getReviewDetail);

// PATCH /mypage/reviewList/update
// 내 리뷰 수정(상세)
router.patch("/reviewList/update", controller.updateReview);

// DELETE /mypage/reviewList/delete
// 내 리뷰 삭제
router.delete("/reviewList/delete", controller.deleteReview);

// GET /mypage/profile
// 내 정보 조회
router.get("/profile", controller.getProfile);

module.exports = router;
