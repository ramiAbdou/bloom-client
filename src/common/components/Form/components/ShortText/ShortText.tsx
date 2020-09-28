/**
 * @fileoverview Component: ShortText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { createRef, useEffect } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { useForm } from '@components/Form/Form.state';
import { useScreen } from '@state/screen';
import CSSModifier from '@util/CSSModifier';
import { ShortTextProps } from '../../Form.types';

export default ({ maxCharacters, title }: ShortTextProps) => {
  const { isMobile } = useScreen();
  const { activeIndex, getItem, items, setActiveIndex, updateItem } = useForm();
  const { value } = getItem(title);

  const inputRef: React.MutableRefObject<HTMLInputElement> = createRef();
  const index = items.findIndex((item) => item.title === title);
  const isActive = activeIndex === index;

  useEffect(() => {
    if (isActive) inputRef.current.focus();
  }, [isActive]);

  useOnClickOutside(inputRef, ({ target }) => {
    // @ts-ignore b/c if it's another input element, we should focus on that.
    if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) setActiveIndex(-1);
  });

  const onClick = () => {
    setActiveIndex(index);

    // This scrolls the input element as far as possible to the right, where it
    // also places the cursor.
    if (isMobile) {
      const { current: element } = inputRef;
      element.scrollLeft = element.scrollWidth - element.clientWidth;
      element.selectionStart = value.length;
    }
  };

  const updateText = (text: string) => {
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    if (maxCharacters && value.length > maxCharacters) return;
    updateItem(title, { value: text });
  };

  const focusOnNextField = ({
    keyCode
  }: React.KeyboardEvent<HTMLInputElement>) =>
    keyCode === 9 && setActiveIndex(index + 1);

  const { css } = new CSSModifier()
    .class('c-form-input')
    .addClass(isActive, 'c-form-input--active');

  return (
    <input
      ref={inputRef}
      className={css}
      placeholder={value || ''}
      type="text"
      value={value}
      onChange={({ target }) => updateText(target.value)}
      onClick={onClick}
      // If the user presses TAB, inactivate the current form item.
      onKeyDown={focusOnNextField}
    />
  );
};
