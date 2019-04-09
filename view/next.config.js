module.exports = {
  webpack(config, {dev}) {
    if (dev) {
      config.plugins = config.plugins.filter(
        plugin => !(plugin.constructor.name === 'FriendlyErrorsWebpackPlugin'),
      );
    }

    return config;
  },
  exportPathMap() {
    return {
      '/': {page: '/'},
    };
  },
};
