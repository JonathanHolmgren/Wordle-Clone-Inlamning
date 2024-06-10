import { mongoose } from 'mongoose';

const Highscore = mongoose.model('Highscore', {
  username: String,
  time: String,
  countGuesses: Number,
  guessWords: Array,
  wordLength: Number,
});

export { Highscore };
