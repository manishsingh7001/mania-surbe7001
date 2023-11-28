const mongoose = require("mongoose");

const QuizzSchema = new mongoose.Schema(
  {
    title: String,
    questions: [
      {
        questionText: String,
        options: [String],
        correctOptionIndex: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizzSchema);
