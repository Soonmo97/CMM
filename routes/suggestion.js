const express = require("express");
const router = express.Router();
const controller = require("../controller/Csuggestion");

// 게시글 목록 조회 요청
router.get("/list", controller.listPage);

// 게시글 작성 페이지 요청
router.get("/write", controller.writePage);

// 특정 게시글 조회 요청
router.get("/post/:postId", controller.getPost);

// 게시글 수정 페이지 요청
router.get("/edit", controller.editPage);

// 특정 게시글 삭제 요청
router.get("/delete", controller.deletePost);

// 게시글 작성 요청
router.post("/writePost", controller.writeSuggestion);

// 게시글 수정 요청
router.post("/editPost", controller.editPost);

// 게시글 추천 요청
router.post("/likePost", controller.likePost);

module.exports = router;
