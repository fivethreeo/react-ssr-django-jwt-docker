'use strict';
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin')
const securityPlugin = require('./razzle-plugins/security/index.js');

module.exports = {
  modify: (defaultConfig, { target }) => {
    const config = defaultConfig;

    if (target === 'web') {
      config.plugins.push(
        new LoadablePlugin({ // add @loadable/webpack-plugin
          writeToDisk: {
            filename: path.resolve('./build/'),
          }
        })
      );
    }

    if (target === 'node') {
      config.entry.unshift('cross-fetch/polyfill'); // add cross-fetch/polyfill for apollo
    }

    return config;
  },

  plugins: ['scss', securityPlugin]
};
