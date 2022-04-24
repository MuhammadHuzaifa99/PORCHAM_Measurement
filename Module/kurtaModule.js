const mongoose = require("mongoose");
var {Schema : {ObjectId}} = require('mongoose')

const kurtaSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "kurta",
  },
  qameezLength: Number,
  Shoulder: Number,
  collar: Number,
  armhole: Number,
  fitting360: Number,
  chest: Number,
  waist: Number,
  hips: Number,
  sleevesLength: Number,
  arm: Number,
  elbow: Number,
  cuff: String,
  collarType: String,
  buttonsStrip: Number,
  buttonsStripType: String,
  frontPocket: Number,
  frontPocketType: String,
  SidePocket: Number,
  SidePocketType: String,
  damanType: String,
  userId: ObjectId,
});

const Kurta = new mongoose.model("Kurta", kurtaSchema);
module.exports = Kurta;
