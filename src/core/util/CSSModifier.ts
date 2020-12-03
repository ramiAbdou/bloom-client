/**
 * @fileoverview Utility: CSSModifier
 *  - Used when a component conditionally adds multiple CSS classes.

 */

export default class CSSModifier {
  css = '';

  constructor(name?: string) {
    if (name) this.css = name;
  }

  /**
   * Conditionally adds a CSS class based on the boolean flag that's passed.
   * Automatically adds a space between the existing CSS class and the new one.
   */
  addClass(flag: boolean, name: string, altName?: string) {
    if (flag && !this.css) this.css += name;
    else if (flag) this.css += ` ${name}`;
    else if (altName) this.css += ` ${altName}`;
    return this;
  }

  addModifier(flag: boolean, modifier: string) {
    if (flag) this.css += modifier;
    return this;
  }

  /**
   * Non-conditionally adds a CSS class to the existing CSS class.
   */
  class(name: string) {
    if (!this.css) this.css = name;
    else this.css += ` ${name}`;
    return this;
  }
}
