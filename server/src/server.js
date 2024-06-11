import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import dontenv from 'dotenv';
import mongoose from 'mongoose';
import apirouter from './routes/api.js';
import pagesrouter from './routes/pages.js';

dontenv.config();
// mongoose.connect(process.env.MONGODB_URL); // har en .env fil
mongoose.connect('mongodb://127.0.0.1:27017/highscore');

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const port = 5080;
app.use(express.json(), cors(corsOptions));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/static', express.static('./static'));

// app.use('/static', express.static('./static'));
// app.use(express.json(), cors(corsOptions)); // Use this after the variable declaration

app.use(apirouter);
app.use(pagesrouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
