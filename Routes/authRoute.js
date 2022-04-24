const express = require("express");
const { login, signUp, protect } = require("../Controllers/authController");
const router = express.Router();

router.post("/login", login).post("/signup", signUp);
// router.route("/signup").post(signUp);

module.exports = router;
