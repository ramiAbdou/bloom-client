/**
 * @fileoverview Config: ESLint
 * - The airbnb-typescript-prettier extension handles a lot for us. It's very
 * strict but has some default rules that we've opted out of. The Airbnb preset
 * require eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react and
 * eslint-plugin-react-hooks, which are good for React TS applications.
 * eslint-config-prettier is needed to prevent formatting conflicts between
 * eslint and prettier.
 */

module.exports = {
  extends: ['airbnb-typescript-prettier'],
  plugins: ['simple-import-sort', 'sort-keys-fix', 'react-hooks'],
  overrides: [
    {
      files: ['*.config.ts', '*.stories.tsx'],
      rules: { 'import/no-extraneous-dependencies': 0 }
    }
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '_', // Allow underscores not to be treated as vars.
        varsIgnorePattern: '_' // Allow underscores not to be treated as vars.
      }
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true }
    ],
    curly: ['error', 'multi-line'],
    'import/newline-after-import': 2,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'max-len': ['error'],

    // Refers to the entire file.
    'max-lines': ['error', { max: 300, skipComments: true }],
    'no-param-reassign': 0,
    'one-var': 0,
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },
      {
        blankLine: 'always',
        prev: '*',
        next: ['function', 'multiline-const', 'multiline-expression']
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-expression'],
        next: 'return'
      }
    ],
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
    'react/require-default-props': 0,
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
    'import/resolver': { typescript: { project: './tsconfig.json' } }
  }
};
