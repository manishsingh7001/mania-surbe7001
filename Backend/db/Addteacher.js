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
    alternatenumber:  Number
    
    
},
{timestamps:true}
);

module.exports = mongoose.model("teacher", TeacherSchema);