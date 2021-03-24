import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';

import SentryWebpackPlugin from '@sentry/webpack-plugin';

let dotEnvName: string;

if (process.env.APP_ENV === 'dev') dotEnvName = '.env.dev';
else if (process.env.APP_ENV === 'stage') dotEnvName = '.env.stage';
else if (process.env.APP_ENV === 'prod') dotEnvName = '.env.prod';

const webpackBaseConfig: WebpackConfiguration = {
  entry: path.join(__dirname, '/src/App.tsx'),

  module: {
    rules: [
      {
        // Handles stylesheets: .css, .scss
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
        // Handles images: .ico, .png
        exclude: /node_modules/,
        loader: 'file-loader',
        options: { context: 'src', name: 'images/[name].[ext]' },
        test: /\.(png|ico)$/
      },
      {
        // Handles SVG files and allows them to be treated like React components
        // where you can import them as a component.
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        // Handles the loading of Typescript files.
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.(ts|tsx)$/
      }
    ]
  },

  // Hanldes a "Cannot find module 'fs'/'net'" error we've seen before.
  node: { fs: 'empty', net: 'empty' },

  // Outputs the file to dist/index.js.
  output: { filename: 'index.js', path: path.join(__dirname, '/dist') },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/manifest.json', to: 'manifest.json' }
    ]),

    // Loads the appropriate .env file based on the APP_ENV.
    new Dotenv({ path: path.resolve(__dirname, dotEnvName) }),

    // Checks to see if there are any duplicate packages in our node_modules,
    // and gives a warning so we can fix them if needed.
    new DuplicatePackageCheckerPlugin(),

    // Allows manifest.json to be read properly which effectively allows the
    // browser to load our favicon very easily.
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      filename: 'index.html',
      template: path.join(__dirname, '/public/index.html')
    }),

    new MiniCssExtractPlugin(),

    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      ignore: ['node_modules', 'webpack.config.*.ts'],
      include: '.',
      org: 'bloom-community',
      project: 'bloom-client'
    }),

    new StylelintPlugin({ files: '**/*.scss', fix: true }),

    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [
      // Reads the tsconfig.json file and automatically imports all of the
      // aliases that we've defined there.
      new TsConfigPathsPlugin()
    ]
  }
};

export default webpackBaseConfig;
