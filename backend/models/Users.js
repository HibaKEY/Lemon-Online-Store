const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetOTP: { type: String }, // OTP for forget password
  otpExpiry: { type: Date },   // OTP expiration time
});

module.exports = mongoose.model("User", UserSchema);
