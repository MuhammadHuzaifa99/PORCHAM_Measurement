const mongoose = require("mongoose");

const shalwarSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Shalwar",
  },
  shalwarLength: Number,
  gear: Number,
  asan: Number,
  bottom: Number,
  ShalwarPocketType: {
    type: String,
    enum: ["zip", "kali", "kaliZip"],
  },
  userId: mongoose.Schema.ObjectId,
});

const Shalwar = mongoose.model("Shalwar", shalwarSchema);
module.exports = Shalwar;
