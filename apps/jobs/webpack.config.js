const { join } = require('path');
const { merge } = require('webpack-merge');
const webpackAppConfig = require('../../webpack.app.config');

module.exports = merge(webpackAppConfig, {
  output: {
    path: join(__dirname, '../../dist/apps/jobs'),
  },
});
