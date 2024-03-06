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

module.exports = router;