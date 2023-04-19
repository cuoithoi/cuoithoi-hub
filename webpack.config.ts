var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};