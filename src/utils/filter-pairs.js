const { v4: uuidv4 } = require('uuid');

const LOGO_URL = 'https://cryptofonts.com/img/icons/';

const getSymbols = (marketPair) => {
  const sliceSymbols = (i) => ([
    marketPair.slice(0, i),
    marketPair.slice(i),
  ]);

  if (marketPair.endsWith('UPUSDT') || marketPair.endsWith('DOWNUSDT')) {
    return [];
  }

  if (marketPair.endsWith('USDT')) {
    return sliceSymbols(-4);
  }

  if (marketPair.endsWith('BTC')) {
    return sliceSymbols(-3);
  }

  return [];
};

const filterPairs = (currencies) => {
  const btcAndUsdPairs = currencies.reduce((acc, {
    symbol: pair, lastPrice, priceChange, priceChangePercent,
  }) => {
    const symbols = getSymbols(pair);

    if (!symbols.length) {
      return acc;
    }

    const [symbol, symbolQuote] = symbols;

    let logoSymbol = symbol;

    if (symbol === 'IOTA') {
      logoSymbol = 'MIOTA';
    }

    if (symbol === 'BCC') {
      logoSymbol = 'BCH';
    }

    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        logo: `${LOGO_URL}${logoSymbol.toLowerCase()}.svg`,
        id: uuidv4(),
        [`${symbolQuote.toLowerCase()}Data`]: {
          symbolQuote,
          marketPair: `${symbol}/${symbolQuote}`,
          priceChange: Number(priceChange),
          priceChangePercent: Number(priceChangePercent),
          price: Number(lastPrice),
        },
      };
      return acc;
    }

    acc[symbol] = {
      ...acc[symbol],
      [`${symbolQuote.toLowerCase()}Data`]: {
        symbolQuote,
        marketPair: `${symbol}/${symbolQuote}`,
        priceChange: Number(priceChange),
        priceChangePercent: Number(priceChangePercent),
        price: Number(lastPrice),
      },
    };

    return acc;
  }, {});

  btcAndUsdPairs.BTC = {
    ...btcAndUsdPairs.BTC,
    btcData: {
      symbolQuote: 'BTC',
      marketPair: 'BTC/BTC',
      priceChange: 0,
      priceChangePercent: 0,
      price: 1,
    },
  };

  return btcAndUsdPairs;
};

module.exports = filterPairs;
