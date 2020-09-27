/**
 * @fileoverview Utility: CSSModifier
 *  - Used when a component conditionally adds multiple CSS classes.
 * @author Rami Abdou
 */

export default class CSSModifier {
  value: string;

  addClass(flag: boolean, name: string) {
    this.value += flag ? ` ${name}` : '';
    return this;
  }

  baseClass(name: string) {
    this.value = name;
    return this;
  }
}
