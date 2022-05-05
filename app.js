const express = require("express");
const authRoute = require("./Routes/authRoute");
const measurmentroute = require("./Routes/measurementRoute");
const Auth = require("./Module/authModule");
const rateLimit = require('express-rate-limit') //for bruteforce attack
const mongoSanitize = require('express-mongo-sanitize');//fot noSQL querry injection
var xss = require('xss-clean') //xss attack(remove script attacks)

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hr
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "you have exceed the number of request",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// server
const app = express();

// middleware
app.use(limiter)
app.use(express.json());
app.use(mongoSanitize());
app.use(xss())
// router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", measurmentroute);

module.exports = app;
