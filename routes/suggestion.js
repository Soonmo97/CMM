const express = require("express");
const router = express.Router();
const controller = require("../controller/CSuggestion");

// 게시글 목록 조회 요청
router.get("/list", controller.listPage);

// 게시글 작성 페이지 요청
router.get("/write", controller.writePage);

// 특정 게시글 조회 요청
router.get("/post/:postId", controller.getPost);

// 특정 게시글 삭제 요청
router.get("/delete", controller.deletePost);

// 게시글 작성 요청
router.post("/writePost", controller.writeSuggestion);

module.exports = router;
