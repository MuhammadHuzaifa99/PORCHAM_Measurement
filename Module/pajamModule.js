const mongoose = require("mongoose");

const pajamaSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Pajama",
  },
  kurtaLength: Number,
  pajamaLength: Number,
  hip: Number,
  thigh: Number,
  bottom: Number,
  userId: { type: mongoose.Schema.ObjectId, ref: "User" , required: [true, "Pajama must belong to user"]},
  kurtaId:  { type: mongoose.Schema.ObjectId, ref: "Kurta"},
  pajamType: {
    type: String,
    required: [true, "Plaes enter your pajama type"],
    enum: {
      values: ["simple", "fitting", "paint", "shape fitting"],
      message: "{VALUE} not supoorted",
    },
  },
});

const Pajama = new mongoose.model("Pajama", pajamaSchema);
module.exports = Pajama;
