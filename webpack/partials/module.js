const MiniCss = require('mini-css-extract-plugin');

const scriptsRule = {
    test: /\.jsx?$/,
    exclude: [/node-modules/],
    use: [
        'babel-loader',
        {
            loader: 'eslint-loader',
            options: {
                emitWarning: true,
                failOnError: false,
            },
        },
    ],
};

const stylesRule = {
    test: /\.scss$/,
    use: [
        MiniCss.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
        'sass-loader',
    ],
};

const webpackModule = {
    rules: [
        scriptsRule,
        stylesRule,
    ],
};

module.exports = {
    dev: webpackModule,
    prod: webpackModule,
};