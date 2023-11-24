const mongoose = require('mongoose');

const FacultieSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
   
    
},
{timestamps:true}
);

module.exports = mongoose.model("Facultie", FacultieSchema);