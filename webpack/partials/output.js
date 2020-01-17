const path = require('path');

const dev = {
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].js',
    publicPath: '/',
};

const prod = {
    path: path.resolve(__dirname, '../../lib'),
    publicPath: '/',
    filename: '[name].js',
    library: 'reactReduxEasyForm',
    libraryTarget: 'umd',
};

module.exports = {
    dev,
    prod,
};
