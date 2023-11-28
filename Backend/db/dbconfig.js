const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://utkarshnandwana:nandwana@utkarsh.zt3p6lf.mongodb.net/regex?retryWrites=true&w=majority").then( ()=> {
    console.log(`MongoDB Connected Successfully`);
})