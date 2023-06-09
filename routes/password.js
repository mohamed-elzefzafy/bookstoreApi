const express = require("express");
const router = express.Router();
const { getForgotPsswordView, sendForgotPsswordLink, getRestPasswordView, RestThePassword } = require("../controllers/passwordController");



router.route("/forgot-Password").get(getForgotPsswordView).post(sendForgotPsswordLink);


// password/reset-Password
router.route("/reset-Password/:userId/:token").get(getRestPasswordView).post(RestThePassword);

module.exports = router;