// routes/search.js

const express = require("express");
const router = express.Router();
const controller = require("../controller/Csearch");

// 키워드 검색을 처리하는 라우트
router.get("/", controller.search);

router.get("/category", controller.category);

module.exports = router;
