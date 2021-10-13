import express = require('express');
import setupElasticSearchData from './elasticsearch';
import getMoviesRoute from './routes/getMovies';
const bodyParser = require('body-parser');
const cors = require('cors');

// setupElasticSearchData().catch((err) => {
//   console.error('ERROR SETTING UP ELASTIC', err);
// });

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
