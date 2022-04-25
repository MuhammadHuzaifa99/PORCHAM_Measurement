const express = require("express");
const {
  login,
  signUp,
  forgotPassword,
} = require("../Controllers/authController");
const router = express.Router();

router
  .post("/login", login)
  .post("/signup", signUp)
  .post("/forgotPassword", forgotPassword);
// router.route("/signup").post(signUp);

module.exports = router;
