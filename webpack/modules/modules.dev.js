module.exports = {
  rules: [
    {
      test: /\.(js|ts)x?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
