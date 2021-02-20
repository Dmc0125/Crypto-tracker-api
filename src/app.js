const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(volleyball);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Crypto tracker API',
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
