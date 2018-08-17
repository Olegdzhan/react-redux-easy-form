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
    filename: '[name].[chunkhash].js',
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi]
    })
  ]
};