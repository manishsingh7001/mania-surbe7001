const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://hemrajsaini8078:aNCeSvdEFE5yKVNK@cluster0.klilxg0.mongodb.net/e-commerce?retryWrites=true&w=majority").then( ()=> {
    console.log(`MongoDB Connected Successfully`);
})


// e-commerce