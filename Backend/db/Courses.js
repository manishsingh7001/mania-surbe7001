const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
   course: String,
   batch: String,
   
    
},
{timestamps:true}
);

module.exports = mongoose.model("Course", CourseSchema);