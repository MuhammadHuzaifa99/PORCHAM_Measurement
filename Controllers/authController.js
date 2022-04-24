const User = require("../Module/authModule");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const jwtToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_WEB_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

exports.login = async (req, res) => {
  try {
    //console.log(req.body);
    var { Username, password } = req.body;
    // username and password was not write
    if (!Username || !password)
      return res.status(404).json({
        status: "error",
        error: "please enter username or password",
      });
    // fetch user whose email enter
    var user = await User.findOne({ Username }).select("+password");
    // password verification
    // paassword autherization
    if (!user || !(await user.passwordVerification(password, user.password))) {
      res.status(401).json({
        msg: "error",
        error: "enter correct email and password",
      });
    }
    var { password, ...ModifiedUser } = user.toObject();
    // jwt generation
    var token = jwtToken(user._id);
    // response
    res.status(200).json({
      msg: "login successful",
      token,
      data: {
        user: ModifiedUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    var user = await User.create(req.body);
    var { password, ...ModifiedUser } = user.toObject();
    // jwt generation
    var token = jwtToken(user._id);
    // response
    res.status(200).json({
      msg: "signup successful",
      token,
      data: {
        ...ModifiedUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1- fetch token
    var token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2- check token exist
    if (!token) {
      return res.status(401).json({
        status: "error",
        error: "please signin",
      });
    }
    // 3- verify
    var decode = await promisify(jwt.verify)(token, process.env.JWT_WEB_SECRET);
    // 4- fetch user by id
    var user = await User.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        status: "error",
        error: "user does not exist",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
