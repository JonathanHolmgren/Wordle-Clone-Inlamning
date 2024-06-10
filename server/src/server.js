import express from 'express';
import cors from 'cors';
import { generateNewWord, checkIfTwoWordMatch } from './controller.js';
import { startWatch, stopWatch } from './time.js';
import { Highscore } from './models.js';

import dontenv from 'dotenv';
import mongoose from 'mongoose';

dontenv.config();
mongoose.connect(process.env.MONGODB_URL);

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
const port = 5080;

app.use(express.static('../client/dist'));
app.use(express.json(), cors(corsOptions)); // Use this after the variable declaration

let currentPlayerTime = 0;
let currentWord = '';

app.get('/', (req, res) => {
  res.status(200).json('Homepage');
});

app.get('/start', (req, res) => {
  startWatch();
  currentWord = generateNewWord();
  res.status(200).json('starting timer...' + currentWord);
});

app.get('/stop', (req, res) => {
  currentPlayerTime = stopWatch();
  res.status(200).json(currentPlayerTime);
});

app.get('/highscore', async (req, res) => {
  const s = await Highscore.find().limit(10);
  const u = s.map((score) => ({
    username: score.username,
    time: score.time,
  }));
  u.sort((a, b) => a.time - b.time);
  res.status(200).json(u);
});

app.post('/checkwin', (req, res) => {
  const x = checkIfTwoWordMatch(currentWord, req.body.guess);
  res.status(201).json(x);
});

app.post('/highscore', async (req, res) => {
  const highscore = new Highscore();
  highscore.username = req.body.username;
  highscore.time = currentPlayerTime;
  highscore.countGuesses = req.body.countGuesses;
  highscore.guessWords = req.body.guessWords;
  highscore.wordLength = req.body.wordLength;

  await highscore.save();
  res.status(201).json(highscore);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
