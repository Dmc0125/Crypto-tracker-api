const { Router } = require('express');

const { getBinanceCurrencies, getCoingeckoLogos } = require('../API');
const filterPairs = require('../utils/filter-pairs');
const mergeLogos = require('../utils/merge-logos');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const binanceResponse = await getBinanceCurrencies();
    const btcAndUsdPairs = filterPairs(binanceResponse);

    const coingeckoLogos = await getCoingeckoLogos(Object.keys(btcAndUsdPairs));

    mergeLogos(coingeckoLogos, btcAndUsdPairs);

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
