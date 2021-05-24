const path = require('path');

module.exports = [
  '@babel/polyfill',
  path.resolve(__dirname, '../../src/index.ts'),
];
