const Kurta = require("../Module/kurtaModule");
const Pajama = require("../Module/pajamModule");
const Shalwar = require("../Module/ShalwarModule");
const { fetchMeasuerment } = require("../Utility/measurementUtility");

exports.fetchMeasurment = async (req, res) => {
  try {
    var kurta = await Kurta.findOne({ userid: req.user._id });
    var shalwar = await Shalwar.findOne({ userid: req.user._id });
    var pajama = await Pajama.findOne({ userid: req.user._id });

    if (shalwar && shalwar && pajama) {
      res.status(200).json({
        msg: "success",
        data: kurta,
        shalwar,
        pajama,
      });
    } else if (kurta && shalwar) {
      res.status(200).json({
        msg: "success",
        data: kurta,
        shalwar,
      });
    } else if (kurta && pajama) {
      res.status(200).json({
        msg: "success",
        data: kurta,
        pajama,
      });
    } else if (kurta) {
      res.status(200).json({
        msg: "success",
        data: kurta,
      });
    } else if (shalwar) {
      res.status(200).json({
        msg: "success",
        data: shalwar,
      });
    } else if (pajama) {
      res.status(200).json({
        msg: "success",
        data: pajama,
      });
    } else {
      res.status(404).json({
        msg: "no measurement found",
      });
    }
  } catch (error) {
    res.status(404).json({
      msg: error,
      error: error.message,
    });
  }
};

exports.kurta = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    var kurta = await Kurta.create(req.body);
    // console.log(req.body);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      data: kurta,
    });
    req.kurta = kurta;
  } catch (error) {
    res.status(404).json({
      msg: error,
      error: error.message,
    });
  }
};

exports.pajama = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    var pajama = await Pajama.create(req.body);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      data: pajama,
      // kurta,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
      error: error.message,
    });
  }
};

exports.shalwar = async (req, res) => {
  try {
    req.body.userId = req.user._id;
    var shalwar = await Shalwar.create(req.body);
    res.status(200).json({
      msg: "success",
      data: shalwar,
    });
  } catch (error) {
    res.status(404).json({
      msg: error,
      error: error.message,
    });
  }
};
