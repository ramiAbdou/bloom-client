
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/preset-scss'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        plugins: [new TsConfigPathsPlugin()]
      }
    };
  }
};

