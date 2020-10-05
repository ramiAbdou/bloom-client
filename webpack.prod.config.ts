/**
 * @fileoverview Config: Webpack (Production)
 * @author Rami Abdou
 */

import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';

export default {
  entry: path.join(__dirname, '/src/App.tsx'),
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.(ts|tsx)$/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
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
        options: {
          context: 'src',
          name: 'images/[name].[ext]'
        },
        test: /\.(jpg|jpeg|gif|png|svg|ico)$/
      },
      {
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          context: 'src',
          name: 'documents/[name].[ext]'
        },
        test: /\.(pdf)$/
      }
    ]
  },
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
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/core/components/'),
      '@constants': path.resolve(__dirname, 'src/core/constants.ts'),
      '@hooks': path.resolve(__dirname, 'src/core/hooks/'),
      '@scenes': path.resolve(__dirname, 'src/scenes/'),
      '@store': path.resolve(__dirname, 'src/core/store/'),
      '@util': path.resolve(__dirname, 'src/core/util/')
    },
    extensions: ['.ts', '.tsx', '.js', '.scss']
  }
};
