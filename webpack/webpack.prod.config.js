const entry = require('./entry/entry.prod');
const output = require('./output/output.prod');
const modules = require('./modules/modules.prod');
const plugins = require('./plugins/plugins.prod');

module.exports = {
  mode: 'production',
  entry,
  output,
  module: modules,
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
};
