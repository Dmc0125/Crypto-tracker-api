/* eslint-disable import/prefer-default-export */
const fetch = require('node-fetch');

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/24hr';

const getBinanceCurrencies = async () => {
  const binanceResponse = await fetch(BINANCE_API_URL);
  const binanceCurrencies = binanceResponse.json();

  return binanceCurrencies;
};

module.exports = {
  getBinanceCurrencies,
};
