module.exports = {
  rules: [
    {
      test: /\.(js|ts)x?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
  ],
};
