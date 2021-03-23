import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import baseConfig from './webpack.config.base';

interface WebpackDevConfiguration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackDevConfig: WebpackDevConfiguration = {
  ...baseConfig,
  devServer: {
    historyApiFallback: true,
    hot: true, // Enables hot reloading via Hot Module Replacement feature.
    open: true, // Opens browser after server has been started.
    port: 3000 // Runs on port 3000.
  },
  mode: 'development'
};

export default webpackDevConfig;
