import express = require('express');
import getMoviesRoute from './routes/getMovies';
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
  }),
  bodyParser.json(),
);

getMoviesRoute(app);

app.listen(4200, () => {
  console.log('listening to port: 4200');
});
