const entry = require('./entry/entry.dev');
const output = require('./output/output.dev');
const modules = require('./modules/modules.dev');
const plugins = require('./plugins/plugins.dev');
const resolver = require('./resolve/resolve.dev');

module.exports = {
  mode: 'development',
  entry,
  output,
  devtool: 'eval-source-map',
  module: modules,
  plugins,
  resolve: resolver,
  devServer: {
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    publicPath: '/',
    historyApiFallback: true
  }
};
