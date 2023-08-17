const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const QuizAnswer = require('../models/userResponse');


router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const totalQuizzes = quizzes.length;

    res.status(200).json({
      quizzes,
      totalQuizzes,
    });
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
  const { userId, answers } = req.body; 
  try {
    const quizAnswer = new QuizAnswer({
      userId,
      answers,
    });

    const savedAnswer = await quizAnswer.save();

    res.status(201).json({
      savedAnswer,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz answers' });
  }
});


router.get('/quizanswers/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 
    const totalAnswers = await QuizAnswer.countDocuments({ userId });
    const totalPages = Math.ceil(totalAnswers / pageSize);

    const userAnswers = await QuizAnswer.find({ userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

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

    res.status(200).json({
      answersWithTotals,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quiz answers' });
  }
});


 
module.exports = router;
