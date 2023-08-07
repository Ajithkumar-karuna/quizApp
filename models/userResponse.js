const mongoose = require('mongoose');

const quizAnswer = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
      selectedOption: { type: Number, required: true }, 
    },
  ],
  times: { type: Date, default: Date.now },
});

const QuizAnswer = mongoose.model('QuizAnswer', quizAnswer);

module.exports = QuizAnswer;