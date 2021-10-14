import express = require('express');
import bodyParser from 'body-parser';
import cors from 'cors';
import setupElasticSearchData from './elasticsearch';
import POST_userLogin from './routes/post.userLogin';
import GET_movies from './routes/get.movies';

setupElasticSearchData().catch((err) => {
  console.error('ERROR SETTING UP ELASTIC', err);
});

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
  }),
  bodyParser.json(),
);

GET_movies(app);
POST_userLogin(app);

app.listen(4200, () => {
  console.log('listening to port: 4200');
});
