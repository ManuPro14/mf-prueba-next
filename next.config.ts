const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config: any, options: any) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfNext',
        remotes: {
          mfAngular: 'mfAngular@http://localhost:4200/remoteEntry.js',
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {},
      })
    );
    return config;
  },
};