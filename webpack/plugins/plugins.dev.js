const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPluginInstance = new HtmlWebpackPlugin({
  template: './usage/index.html',
  title: 'easy-form',
  filename: 'index.html',
});

module.exports = [
  htmlPluginInstance,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProgressPlugin(),
];
