import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,
  mode: 'production',

  module: {
    rules: [
      ...baseConfig.module.rules,
      { test: /\.html$/, use: [{ loader: 'html-loader' }] }
    ]
  }
};
