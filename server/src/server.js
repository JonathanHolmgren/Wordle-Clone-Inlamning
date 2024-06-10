import express from 'express';
import path from 'path';
import cors from 'cors';
import generateNewWord from './controller.js';
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

app.use(express.static('../client/build'));
app.use(express.json(), cors(corsOptions)); // Use this after the variable declaration

let currentPlayerTime = 0;

app.get('/', (req, res) => {
  res.status(200).json(generateNewWord());
});

app.get('/start', (req, res) => {
  startWatch();
  res.status(200).json('starting timer...');
});

app.get('/stop', (req, res) => {
  currentPlayerTime = stopWatch();
  res.status(200).json('stop the time on ' + currentPlayerTime + 'seconds');
});

app.get('/highscore', async (req, res) => {
  const s = await Highscore.find().limit(10);
  const u = s.map((score) => ({
    username: score.username,
    time: score.time,
  }));
  res.status(200).json(u);
});

app.post('/highscore', async (req, res) => {
  const highscore = new Highscore(req.body);
  highscore.time = x;
  await highscore.save();
  res.status(201).json(x);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get('/correctword', (req, res) => {
//   const fakeListDatabase = ['word1', 'word2', 'word3']; // Fake data for example
//   res.status(200).json(fakeListDatabase);
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build', 'about.html'));
// });

// app.get('/currentplayer', (req, res) => {
//   startWatch();
//   res.status(200).json(currentPlayerTime);
// });
