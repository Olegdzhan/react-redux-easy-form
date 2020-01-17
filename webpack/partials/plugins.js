const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

const miniCss = new MiniCss();

const html = new HtmlWebpackPlugin({
    template: path.join(__dirname, '../../usage/index.html'),
    filename: './index.html',
});

module.exports = {
    dev: [
        miniCss,
        html,
    ],
    prod: [],
};