const mongoose = require('mongoose');

const QuizzSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    // },
    title: String,
    questions: [{
      questionText: String,
      options: [String],
      correctOptionIndex: Number,
    }],
   




    // title: {
    //     type: String,
    //     required: true,
    // },
    // code:{
    //     type: String,
    //     required: true,
    //     default: "test"
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }


},
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizzSchema);