'use strict';
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin')
const securityPlugin = require('./razzle-plugins/security/index.js');

module.exports = {
  modify: (defaultConfig, { target }) => {
    const config = defaultConfig;
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
    if (target === 'node') {
      config.entry.unshift('cross-fetch/polyfill');

    }
  return config;
  },
  plugins: ['scss', securityPlugin]
};
