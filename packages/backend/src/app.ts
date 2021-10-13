import express = require('express');
import getMoviesRoute from './routes/getMovies';
import bodyParser from 'body-parser';
import cors from 'cors';
import setupElasticSearchData from './elasticsearch';
import postUserLogin from "./routes/postUserLogin";

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

getMoviesRoute(app);
postUserLogin(app)

app.listen(4200, () => {
  console.log('listening to port: 4200');
});
