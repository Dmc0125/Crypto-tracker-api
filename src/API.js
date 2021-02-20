/* eslint-disable import/prefer-default-export */
const fetch = require('node-fetch');

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const getBinanceCurrencies = async () => {
  const binanceResponse = await fetch(BINANCE_API_URL);
  const binanceCurrencies = binanceResponse.json();

  return binanceCurrencies;
};

const getCoingeckoLogos = async (symbols) => {
  const coingeckoListResponse = await fetch(`${COINGECKO_API_URL}/coins/list`);
  const coingeckoList = await coingeckoListResponse.json();

  const coingeckoCurrenciesList = coingeckoList
    .reduce((acc, { symbol, id }) => {
      acc[symbol] = id;
      return acc;
    }, {});

  const ids = symbols.reduce((acc, symbol) => {
    const id = coingeckoCurrenciesList[symbol.toLowerCase()];

    if (!id) {
      return acc;
    }

    return [...acc, id];
  }, []);

  const coingeckoCurrenciesReponse = await fetch(`${COINGECKO_API_URL}/coins/markets?ids=${ids.join(',')}&vs_currency=btc`);
  const coingeckoCurrencies = await coingeckoCurrenciesReponse.json();
  const coingeckoLogos = coingeckoCurrencies
    .reduce((acc, { symbol, image }) => [...acc, { symbol, image }], []);

  return coingeckoLogos;
};

module.exports = {
  getBinanceCurrencies,
  getCoingeckoLogos,
};
