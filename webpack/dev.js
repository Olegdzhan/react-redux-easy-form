const entry = require('./partials/entry').dev;
const output = require('./partials/output').dev;
const packModule = require('./partials/module').dev;
const plugins = require('./partials/plugins').dev;
const resolver = require('./partials/resolver').dev;

module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3030,
        historyApiFallback: true,
    },
    entry,
    output,
    module: packModule,
    plugins,
    resolve: resolver,
};
