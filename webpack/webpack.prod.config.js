const entry = require('./entry/entry.prod');
const output = require('./output/output.prod');
const modules = require('./modules/modules.prod');
const plugins = require('./plugins/plugins.prod');
const resolver = require('./resolve/resolve.prod');

module.exports = {
  mode: 'production',
  entry,
  output,
  module: modules,
  plugins,
  resolve: resolver,
};
