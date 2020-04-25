module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow',
    ],
    plugins: [
        '@babel/plugin-transform-flow-strip-types',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-optional-chaining', { loose: false }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-export-default-from', { loose: false }],
    ],
    env: {
        test: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-flow',
            ],
        },
    },
};
