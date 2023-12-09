const mongoose = require('mongoose');

const StdSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email:String,
    password:  String,
    currentaddress: String,
    permanentaddress: String,
    institutename: String,
    highestqualification: String,
    gender: String,
    courses:  String,
    contactnumber: Number,
    alternatenumber:  Number,
    referalcode: String,
    otp: String,
    otpExpiration: Date,
    role: {
        type: String,
        enum: ['student'],
        default: 'student'
      }
    
},
{timestamps:true}
);

module.exports = mongoose.model("Addstd", StdSchema);