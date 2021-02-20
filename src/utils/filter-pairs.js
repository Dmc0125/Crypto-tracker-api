const { v4: uuidv4 } = require('uuid');

const getSymbols = (marketPair) => {
  const sliceSymbols = (i) => ([
    marketPair.slice(0, i),
    marketPair.slice(i),
  ]);

  if (
    marketPair.endsWith('USD')
    || marketPair.endsWith('GUSD')
  ) {
    return 0;
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

    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        id: uuidv4(),
        [`${symbolQuote.toLowerCase()}Data`]: {
          marketPair: `${symbol}/${symbolQuote}`,
          symbolQuote,
          priceChange,
          priceChangePercent,
          price: lastPrice,
        },
      };

      return acc;
    }

    acc[symbol] = {
      ...acc[symbol],
      [`${symbolQuote.toLowerCase()}Data`]: {
        marketPair: `${symbol}/${symbolQuote}`,
        symbolQuote,
        priceChange,
        priceChangePercent,
        price: lastPrice,
      },
    };

    return acc;
  }, {});

  return btcAndUsdPairs;
};

module.exports = filterPairs;
