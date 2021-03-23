import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';

import baseConfig from './webpack.config.base';

// Also used for stage builds, despite that we call this "prodConfig".
const webpackProdConfig: WebpackConfiguration = {
  ...baseConfig,
  mode: 'production',
  module: {
    rules: [
      ...baseConfig.module.rules,
      { test: /\.html$/, use: [{ loader: 'html-loader' }] }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([{ from: 'src/server.ts', to: 'server.ts' }])
  ]
};

export default webpackProdConfig;
