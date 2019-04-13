'use strict';

const path = require("path");
const paths = require('razzle/config/paths');

module.exports = (
  defaultConfig,
  env,
  webpack,
  userOptions = {}
) => {

  const { target, dev} = env;
  const config = Object.assign({}, defaultConfig);

  if (target === 'node') {

    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({RAZZLE_SECURITY_RC: JSON.stringify(path.resolve(paths.appPath, ".securityrc.js")) })
    ]
  }

  return config;
};
