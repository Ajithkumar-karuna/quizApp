const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const QuizAnswer = require('../models/userResponse');


router.post('/quizzes', async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create quiz' });
  }
});
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

router.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

router.post('/quizanswers', async (req, res) => {
  const { userId, answers, page = 1, limit = 10 } = req.body; // Added page and limit parameters

  try {
    const quizAnswer = new QuizAnswer({
      userId,
      answers,
    });

    const savedAnswer = await quizAnswer.save();

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Query database for paginated results
    const paginatedAnswers = await QuizAnswer.find({ userId }).skip(skip).limit(limit);

    res.status(201).json({
      savedAnswer,
      paginatedAnswers,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz answers' });
  }
});

 
router.get('/quizanswers/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userAnswers = await QuizAnswer.find({ userId });
    const answersWithTotals = userAnswers.map(userAnswer => {
      const totalScore = userAnswer.answers.reduce((total, answer) => {
        const questionScore = answer.selectedOption; 
        return total + questionScore;
      }, 0);

      return {
        _id: userAnswer._id,
        userId: userAnswer.userId,
        totalScore,
        times: userAnswer.times,
      };
    });

    res.status(200).json(answersWithTotals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz answers' });
  }
});

module.exports = router;
