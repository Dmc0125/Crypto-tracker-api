const mergeLogos = (logos, currencies) => {
  logos.forEach(({ symbol, image }) => {
    currencies[symbol.toUpperCase()].logo = image;
  });
};

module.exports = mergeLogos;
