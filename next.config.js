module.exports = {
  env: {
    NEXT_BACKEND_DOMAIN: process.env.NEXT_BACKEND_DOMAIN,
  },
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: { loader: "worker-loader" },
    });

    return config;
  },
};
