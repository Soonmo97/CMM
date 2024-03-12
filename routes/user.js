const express = require("express");
const router = express.Router();
const controller = require("../controller/Cuser");

// GET /
router.get("/", controller.getMain);
// POST /include/header/modal_login
router.post("/form/login", controller.loginHeader);
// POST /include/header/modal_register
router.post("/form/register", controller.registerHeader);
// POST /include/header/form_logout
router.post("/form/logout", controller.logoutHeader);
// POST /user/idCheckForm/checkForm
router.post("/form/checkid", controller.checkId);
// GET /user/idCheckForm
router.get("/user/idCheckForm", controller.checkWindow);
// GET /user/login
router.get("/user/login", controller.getLogin);
// POST /user/login
router.post("/user/login", controller.postLogin);
// POST /form/sendCode
router.post("/form/sendCode", controller.sendCode);
// POST /form/checkCode
router.post("/form/checkCode", controller.checkCode);
// GET /user/searchId
router.get("/user/searchId", controller.getSearchId);
// POST /user/searchId
router.post("/user/searchId", controller.postSearchId);
// GET /user/searchPw
router.get("/user/searchPw", controller.getSearchPw);
// POST /user/searchPw
router.post("/user/searchPw", controller.postSearchPw);
// POST /user/searchPw
router.post("/user/alterPw", controller.alterPw);
// GET /load-more
router.get("/load-more", controller.loadMoreData);



module.exports = router;
