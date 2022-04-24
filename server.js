require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const Auth = require("./Module/authModule");

mongoose
  .connect(process.env.MONGO_STR.replace("<PASSWORD>", process.env.MONGO_PASS))
  .then((con) => console.log("Mongodb connected"));

// server listner
app.listen(process.env.PORT, () => {
  console.log(`Server Listen on ${process.env.PORT}`);
});
