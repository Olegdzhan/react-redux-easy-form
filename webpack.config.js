const path = require('path');
const webpack =require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    lib: path.join(__dirname, './lib/index.js')
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '',
    filename: '[name].js',
    library: 'reactReduxEasyForm',
    libraryTarget: 'umd'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
};