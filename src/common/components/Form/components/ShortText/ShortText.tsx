/**
 * @fileoverview Component: ShortText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { useScreen } from '@state/screen';
import CSSModifier from '@util/CSSModifier';
import ShortTextProvider, {
  ShortTextProviderProps,
  useShortText
} from './ShortText.state';

const TextBar = () => {
  const { isMobile } = useScreen();
  const { isActive, setIsActive, text, updateText } = useShortText();

  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);
  useOnClickOutside(inputRef, () => setIsActive(false));

  // This scrolls the input element as far as possible to the right, where it
  // also places the cursor.
  const scrollToEnd = () => {
    const { current: element } = inputRef;
    element.scrollLeft = element.scrollWidth - element.clientWidth;
    element.selectionStart = text.length;
  };

  const onClick = () => {
    setIsActive(true);
    if (isMobile) scrollToEnd();
  };

  const { css } = new CSSModifier()
    .class('c-form-input')
    .addClass(isActive, 'c-form-input--active');

  return (
    <button className={css} onFocus={() => inputRef.current.focus()}>
      <input
        ref={inputRef}
        className="c-form-input__txt"
        placeholder={text || ''}
        type="text"
        value={text}
        onChange={({ target }) => updateText(target.value)}
        onClick={onClick}
        onFocus={onClick}
        // If the user presses tab, inactivate the current form item.
        onKeyDown={({ keyCode }) => keyCode === 9 && setIsActive(false)}
      />
    </button>
  );
};

// -----------------------------------------------------------------------------

export default (props: ShortTextProviderProps) => (
  <ShortTextProvider {...props}>
    <TextBar />
  </ShortTextProvider>
);
