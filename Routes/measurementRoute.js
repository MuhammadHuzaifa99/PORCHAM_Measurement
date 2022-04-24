const express = require("express");
const { protect } = require("../Controllers/authController");
const {
  kurta,
  pajama,
  shalwar,
  fetchMeasurment,
} = require("../Controllers/MeasurementController");

const router = express.Router();

router.get("/fetchMeasurement", protect, fetchMeasurment);
router.post("/kurta", protect, kurta);
router.post("/pajama", protect, pajama);
router.post("/shalwar", protect, shalwar);

module.exports = router;
