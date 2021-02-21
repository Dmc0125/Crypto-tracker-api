const { Router } = require('express');

const { getBinanceCurrencies } = require('../API');
const filterPairs = require('../utils/filter-pairs');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const binanceResponse = await getBinanceCurrencies();
    const btcAndUsdPairs = filterPairs(binanceResponse);

    res.json({
      binanceCurrencies: btcAndUsdPairs,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  router,
  path: '/currencies',
};
