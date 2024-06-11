import { Router } from 'express';
import { generateNewWord, checkIfTwoWordMatch } from '../controller.js';
import { startWatch, stopWatch } from '../time.js';
import { Highscore } from '../models.js';

const router = Router();

let currentPlayerTime = 0;
let currentWord = '';

router.get('/start', (req, res) => {
  startWatch();
  currentWord = generateNewWord();
  res.status(200).json('starting timer...' + currentWord);
});

router.get('/stop', (req, res) => {
  currentPlayerTime = stopWatch();
  res.status(200).json(currentPlayerTime);
});

router.post('/checkwin', (req, res) => {
  const x = checkIfTwoWordMatch(currentWord, req.body.guess);
  res.status(201).json(x);
});

router.post('/highscore', async (req, res) => {
  const highscore = new Highscore();
  highscore.username = req.body.username;
  highscore.time = currentPlayerTime;
  highscore.countGuesses = req.body.countGuesses;
  highscore.guessWords = req.body.guessWords;
  highscore.wordLength = req.body.wordLength;

  await highscore.save();
  res.status(201).json(highscore);
});

export default router;
