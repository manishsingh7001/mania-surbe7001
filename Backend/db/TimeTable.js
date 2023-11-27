const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    filename: String,
    path: String,
  });

  module.exports = mongoose.model("timetable", pdfSchema)