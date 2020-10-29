/**
 * @fileoverview Config: ESLint
 * - The airbnb-typescript-prettier extension handles a lot for us. It's very
 * strict but has some default rules that we've opted out of. The Airbnb preset
 * require eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react and
 * eslint-plugin-react-hooks, which are good for React TS applications.
 * eslint-config-prettier is needed to prevent formatting conflicts between
 * eslint and prettier.
 * @author Rami Abdou
 */

module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['simple-import-sort', 'sort-keys-fix', 'react-hooks'],
  overrides: [
    {
      files: ['*.config.ts'],
      rules: { 'import/no-extraneous-dependencies': 0 }
    }
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '_', // Allow underscores not to be treated as vars.
        varsIgnorePattern: '_' // Allow underscores not to be treated as vars.
      }
    ],
    'import/newline-after-import': 2,
    'import/prefer-default-export': 0,
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'max-len': ['error'],
    'no-param-reassign': 0,
    'no-plusplus': 0, // Allow the plus-plus syntax: i++.
    'one-var': 0,
    'react/button-has-type': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false
      }
    ],
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0, // Don't require prop type specification.
    'react/require-default-props': 0, // Don't require default props.
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    semi: 2, // Require a semicolon.
    'simple-import-sort/sort': [
      2,
      {
        // This groups 3rd-party packages together, then groups internal @
        // alias modules with "../" type files.
        groups: [['^\\u0000'], ['^\\w'], ['^@?\\w', '^\\.']]
      }
    ],
    'sort-keys-fix/sort-keys-fix': 2 // Sorts objects keys automatically.
  },
  settings: {
    'import/resolver': { typescript: { directory: './tsconfig.json' } }
  }
};
