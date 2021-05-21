const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin(),
];
