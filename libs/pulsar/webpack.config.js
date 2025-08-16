const { join } = require('path');
const { merge } = require('webpack-merge');
const webpackLibConfig = require('../../webpack.lib.config');

module.exports = merge(webpackLibConfig, {
  output: {
    path: join(__dirname, '../../dist/libs/pulsar'),
  },
});
