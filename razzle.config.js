'use strict';
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin')
const securityPlugin = require('./razzle-plugins/security/index.js');

module.exports = {
  modify: (config, { target }) => {
    if (target === 'web') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new LoadablePlugin({
            writeToDisk: {
              filename: path.resolve('./build/'),
            }
          }),
        ],
      };
    }
  return config;
  },
  plugins: ['scss', securityPlugin]
};
