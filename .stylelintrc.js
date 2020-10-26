/**
 * @fileoverview Config: Stylelint
 * - Standarized linting for all CSS and SASS files. Most importantly,
 * alphabetical ordering of properties in all CSS classes.
 * @author Rami Abdou
 */

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name', 'first-nested']
      }
    ],
    'at-rule-no-unknown': null,
    'at-rule-semicolon-newline-after': null,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['inside-single-line-block']
      }
    ],
    'declaration-block-single-line-max-declarations': 4,
    'font-family-no-missing-generic-family-keyword': null,
    'max-empty-lines': 1,
    'max-line-length': 80,
    'no-eol-whitespace': null,
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
