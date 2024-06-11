import { Router } from 'express';
import { Highscore } from '../models.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('game');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/highscores', async (req, res) => {
  const entrymodels = await Highscore.find().limit(10);
  const entries = entrymodels.map((model) => model.toJSON());

  entries.sort((a, b) => a.time - b.time);
  res.render('highscore', { entries });
});

export default router;
