'use strict';
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const paths = require('razzle/config/paths');


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
      
      if (dev) {

        if (typeof process.env.RAZZLE_DISABLE_CODESPLIT !== 'undefned') {
          config.plugins.unshift(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          }));
        }

        config.devServer.quiet = false;
        config.devServer.public = 'localhost:443';
        // config.devServer.contentBase = paths.appBuild;

        config.module.rules = config.module.rules.reduce((rules, rule) => {
          if (rule.test &&
            rule.test.toString()===/\.(js|jsx|mjs)$/.toString() &&
            !rule.enforce) {

            const { use, ...rest } = rule;

            rules.push({ ...rule, ...{
              exclude: /razzle-dev-utils\/webpackHotDevClient\.js/
            }});

            rules.push({ ...rest, ...{
              use: [ ...use, {
                loader: require.resolve('patch-loader'),
                options: { patch: '../../customDevClientPort.diff' },
              }],
              include: /razzle-dev-utils\/webpackHotDevClient\.js/,
            }});


          }
          else {
            rules.push(rule);
          } 
          return rules;
        }, []);
      }
    }
    return config;
  },
  plugins: [ 'scss', 'eslint' ]
};
