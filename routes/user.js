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
// GET /loadMoreRestaurants
router.get("/loadMoreRestaurants", controller.loadMoreRestaurants);

module.exports = router;
