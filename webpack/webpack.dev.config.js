const entry = require('./entry/entry.dev');
const output = require('./output/output.dev');
const modules = require('./modules/modules.dev');
const plugins = require('./plugins/plugins.dev');

module.exports = {
  mode: 'development',
  entry,
  output,
  devtool: 'eval-source-map',
  module: modules,
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  devServer: {
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    publicPath: '/',
    historyApiFallback: true
  }
};
