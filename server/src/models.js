import { mongoose } from 'mongoose';

const Highscore = mongoose.model('Highscore', {
  username: String,
  time: String,
});

export { Highscore };
