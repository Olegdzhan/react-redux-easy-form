const path = require('path');

const dev = {
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].js',
    publicPath: '/',
};

const prod = {
    path: path.resolve(__dirname, '../../bundle'),
    publicPath: '/',
    filename: 'easy-form.js',
    library: 'reactReduxEasyForm',
    libraryTarget: 'umd',
};

module.exports = {
    dev,
    prod,
};
