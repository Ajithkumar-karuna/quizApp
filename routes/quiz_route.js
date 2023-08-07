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
  const { quizId, userId, answers } = req.body;

  try {
    // Create a new QuizAnswer document
    const quizAnswer = new QuizAnswer({
      quizId,
      userId,
      answers,
    });

    // Save the user's quiz answers to the database
    const savedAnswer = await quizAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz answers' });
  }
});
 

module.exports = router;
