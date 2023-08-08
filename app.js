const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quiz_route');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://techno:WXh3WegGu08hIyiL@cluster0.id8964e.mongodb.net/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});

app.use('/api', quizRoutes);

app.listen(3000, () => {
  console.log(`Server is running on `);
});
