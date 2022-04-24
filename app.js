const express = require("express");
const authRoute = require("./Routes/authRoute");
const measurmentroute = require("./Routes/measurementRoute");
const Auth = require("./Module/authModule");

// server
const app = express();

// middleware
app.use(express.json());

// router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", measurmentroute);

module.exports = app;
