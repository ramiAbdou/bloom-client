import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack, { Configuration } from 'webpack';

import { isDevelopment } from './src/util/constants';

const baseConfig: Configuration = {
  entry: path.join(__dirname, '/src/App.tsx'),
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        exclude: /node_modules/,
        loader: 'file-loader',
        options: { context: 'src', name: 'images/[name].[ext]' },
        test: /\.(png|ico)$/
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.(ts|tsx)$/
      }
    ]
  },
  node: { fs: 'empty' },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/manifest.json', to: 'manifest.json' }
    ]),
    new Dotenv(),
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      filename: 'index.html',
      template: path.join(__dirname, '/public/index.html')
    }),
    new MiniCssExtractPlugin(),
    new StylelintPlugin({ fix: true }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [new TsConfigPathsPlugin()]
  }
};

const devConfig = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000
  }
};

const config: Configuration = {
  ...baseConfig,
  ...(isDevelopment ? devConfig : {}),
  mode: !isDevelopment ? 'production' : 'development',
  module: {
    rules: [
      ...baseConfig.module.rules,
      ...(!isDevelopment
        ? [{ test: /\.html$/, use: [{ loader: 'html-loader' }] }]
        : [])
    ]
  }
};

export default config;
