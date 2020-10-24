/**
 * @fileoverview Config: Stylelint
 * - Standarized linting for all CSS and SASS files. Most importantly,
 * alphabetical ordering of properties in all CSS classes.
 * @author Rami Abdou
 */

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'declaration-block-single-line-max-declarations': 3,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['inside-single-line-block']
      }
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'max-empty-lines': 1,
    'max-line-length': 80,
    'order/order': [
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'extend'
      },
      'declarations',
      'rules',
      'at-rules'
    ],
    'order/properties-alphabetical-order': true
  }
};
