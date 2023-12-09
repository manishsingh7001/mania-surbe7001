const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    
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
    otp: String,
    otpExpiration: Date,
    role: {
        type: String,
        enum: ['faculty'],
        default: 'faculty'
      }
    
    
},
{timestamps:true}
);

module.exports = mongoose.model("teacher", TeacherSchema);