const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiration: Date,
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
