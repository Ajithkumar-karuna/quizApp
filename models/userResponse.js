const mongoose = require('mongoose');

const quizAnswer = new mongoose.Schema({
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




// router.get('/quizanswers/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const userAnswers = await QuizAnswer.find({ userId });
//     const answersWithTotals = userAnswers.map(userAnswer => {
//       const totalScore = userAnswer.answers.reduce((total, answer) => {
//         const questionScore = answer.selectedOption; 
//         return total + questionScore;
//       }, 0);

//       return {
//         _id: userAnswer._id,
//         userId: userAnswer.userId,
//         totalScore,
//         times: userAnswer.times,
//       };
//     });

//     res.status(200).json(answersWithTotals);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve quiz answers' });
//   }
// });
