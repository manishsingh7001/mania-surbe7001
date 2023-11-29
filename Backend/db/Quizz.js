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
    scores: [{
        userId: String, // Assuming a string identifier for users
        score: Number,
      }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizzSchema);
