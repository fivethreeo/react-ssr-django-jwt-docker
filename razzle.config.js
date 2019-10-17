'use strict';
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  modify: (defaultConfig, { target, dev }, webpack) => {
    const config = defaultConfig;

    if (target === 'web') {
      config.plugins.unshift(
        new LoadablePlugin({ // add @loadable/webpack-plugin
          writeToDisk: {
            filename: path.resolve('./build/'),
          }
        })
      );
      if (dev) { config.devServer.quiet = false; }
    }


    if (target === 'node') {
      // config.entry.unshift('cross-fetch/polyfill'); // add cross-fetch/polyfill for apollo
    }

    return config;
  },
  plugins: [ 'scss', 'eslint' ]
};
