const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config: any, options: any) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'nextHost',
        remotes: {
          angularRemote: 'angularRemote@http://localhost:4200/remoteEntry.js',
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true }
        },
        extraOptions: {
          automaticAsyncBoundary: true
        }
      })
    );
    return config;
  },
};