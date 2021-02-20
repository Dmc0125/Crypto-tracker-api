module.exports = {
  env: {
    jest: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'arrow-parens': 0,
    camelcase: 0,
    'no-unused-vars': 'warn',
  },
};
