const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    lib: path.join(__dirname, './lib/index.js'),
    usage: path.join(__dirname, './usage/usage.js')
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '',
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
    alias: {
      lib: path.join(__dirname, './lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: true }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './usage/index.html'),
      filename: './index.html'
    })
  ],
  devServer: {
    port: 5656,
    publicPath: '/',
    historyApiFallback: true
  }
};