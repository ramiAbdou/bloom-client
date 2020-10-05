/**
 * @fileoverview Utility: CSSModifier
 *  - Used when a component conditionally adds multiple CSS classes.
 * @author Rami Abdou
 */

export default class CSSModifier {
  css = '';

  /**
   * Conditionally adds a CSS class based on the boolean flag that's passed.
   * Automatically adds a space between the existing CSS class and the new one.
   */
  addClass(flag: boolean, name: string) {
    this.css += flag ? ` ${name}` : '';
    return this;
  }

  /**
   * Non-conditionally adds a CSS class to the existing CSS class.
   */
  class(name: string) {
    this.css += ` ${name}`;
    return this;
  }
}
