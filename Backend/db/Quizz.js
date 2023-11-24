const mongoose = require('mongoose');

const QuizzSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    // },
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
   




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