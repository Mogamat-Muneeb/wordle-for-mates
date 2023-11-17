const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
  // Add the WorkboxWebpackPlugin to the plugins array
  config.plugins.push(
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    })
  );
  
  return config;
};
