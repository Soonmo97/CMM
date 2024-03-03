const express = require("express");
const router = express.Router();
const controller = require("../controller/CSuggestion");

router.get("/list", controller.listPage);
router.get("/write", controller.writePage);
router.get("/post/:postId", controller.getPost);
router.get("/delete", controller.deletePost);

router.post("/writePost", controller.writeSuggestion);

module.exports = router;
