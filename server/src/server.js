import express from 'express';
import path from 'path';
import cors from 'cors';
import generateNewWord from './controller.js';
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

const fakeListDatabase = [
  {
    text: 'Learn JavaScript',
    completed: true,
  },
  {
    text: 'Learn Java',
    completed: true,
  },
  {
    text: 'Learn Next.js',
    completed: true,
  },
];

app.get('/', (req, res) => {
  res.status(200).json(generateNewWord());
});

app.get('/correctword', (req, res) => {
  const fakeListDatabase = ['word1', 'word2', 'word3']; // Fake data for example
  res.status(200).json(fakeListDatabase);
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'about.html'));
});

app.post('/highscore', async (req, res) => {
  const highscore = new Highscore(req.body);
  await highscore.save();

  res.status(201).json({ data: req.body });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
