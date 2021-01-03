import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';

export default {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000
  },
  entry: './src/App.tsx',
  mode: 'development',
  module: {
    rules: [
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
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader']
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
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.(ts|tsx)$/
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
    new Dotenv({ path: './.env' }),
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
