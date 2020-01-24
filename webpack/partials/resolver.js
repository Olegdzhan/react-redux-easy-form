const path = require('path');

const devResolve = {
    modules: ['node_modules'],
    extensions: ['.js', '.scss'],
    alias: {
        lib: path.resolve(__dirname, '../../lib')
    }
};

const prodResolve = {
    modules: ['node_modules'],
    extensions: ['.js'],
};

module.exports = {
    dev: devResolve,
    prod: prodResolve,
};