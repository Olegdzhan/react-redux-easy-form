const entry = require('./partials/entry').prod;
const output = require('./partials/output').prod;
const packModule = require('./partials/module').prod;
const plugins = require('./partials/plugins').prod;
const resolver = require('./partials/resolver').prod;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry,
    output,
    module: packModule,
    plugins,
    resolve: resolver,
};
