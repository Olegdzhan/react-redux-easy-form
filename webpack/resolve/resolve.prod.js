const TSAliasPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  extensions: ['.js', '.ts', '.tsx'],
  modules: ['node_modules'],
  fallback: {
    'path': require.resolve('path-browserify'),
  },
  plugins: [new TSAliasPlugin()],
};
