const { v4: uuidv4 } = require('uuid');

const LOGO_URL = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@9ab8d6934b83a4aa8ae5e8711609a70ca0ab1b2b/svg/icon/';

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

    if (symbol.endsWith('UP') || symbol.endsWith('DOWN')) {
      console.log(symbol, symbolQuote);
    }

    let logoSymbol = symbol;

    if (symbol === 'IOTA') {
      logoSymbol = 'MIOTA';
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

  return btcAndUsdPairs;
};

module.exports = filterPairs;
