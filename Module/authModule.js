const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "user name must be entered"],
  },
  email: {
    type: String,
    required: [true, "email must be entered"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be entered"],
    minlength: 8,
    maxlength: 16,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "password does not match",
    },
  },
});

userSchema.methods.passwordVerification = async (password, encryptedPass) => {
  return await bcrypt.compare(password, encryptedPass);
};

userSchema.pre("save", async function (next) {
  var encryptedPass = await bcrypt.hash(this.password, 12);
  // console.log(encryptedPass);
  this.password = encryptedPass;
  this.confirmPassword = undefined;
  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
