const path = require('path');

module.exports = {
    dev: {
        lib: [
            '@babel/polyfill/noConflict',
            path.resolve(__dirname, '../../lib/index.js'),
        ],
        playground: path.resolve(__dirname, '../../usage/usage.js'),
    },
    prod: [
        '@babel/polyfill/noConflict',
        path.resolve(__dirname, '../../lib/index.js'),
    ],
};