module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-shadow": 0,
    "arrow-parens": 0,
    "no-param-reassign": 0,
    "comma-dangle":0,
    "dot-notation":0,
    "no-constant-condition":0,
    "consistent-return":0,
    "operator-linebreak":0,
    "implicit-arrow-linebreak": 0,
    "no-underscore-dangle":0,
    "no-return-assign": 0,
  },
  globals:{
    chrome: true
  }
};
