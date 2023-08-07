const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
});
const Quiz = mongoose.model('Quiz', questionSchema);


module.exports = Quiz;