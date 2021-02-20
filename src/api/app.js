const express = require('express');

const currencies = require('./currencies');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Coinmarketcap proxy API',
  });
});

router.use(currencies.path, currencies.router);

module.exports = router;
