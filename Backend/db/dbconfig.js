const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://hemrajsaini8078:aNCeSvdEFE5yKVNK@cluster0.klilxg0.mongodb.net/regex?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`MongoDB Connected Successfully`);
  });

// e-commerce
