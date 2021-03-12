import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000
  },
  mode: 'development'
};
