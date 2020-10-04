/**
 * @fileoverview Component: ShortText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import CSSModifier from '@util/CSSModifier';
import { Form } from '../Form.state';
import { FormItemData } from '../Form.types';

export default ({ maxCharacters, title }: FormItemData) => {
  const { isActive, value } = Form.useStoreState(({ getItem }) =>
    getItem(title)
  );

  const next = Form.useStoreActions((store) => store.next);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const activate = () => updateItem({ isActive: true, title });
  const inactivate = () => updateItem({ isActive: false, title });

  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (isActive) inputRef.current.focus();
  }, [isActive]);

  useOnClickOutside(inputRef, () => isActive && inactivate());

  const updateText = (text: string) => {
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    if (maxCharacters && text.length > maxCharacters) return;
    updateItem({ title, value: text });
  };

  const focusOnNextField = ({
    keyCode
  }: React.KeyboardEvent<HTMLInputElement>) => keyCode === 9 && next(title);

  const { css } = new CSSModifier()
    .class('c-form-input')
    .addClass(isActive, 'c-form-input--active');

  return (
    <input
      ref={inputRef}
      className={css}
      placeholder={value || ''}
      type="text"
      value={value || ''}
      onChange={({ target }) => updateText(target.value)}
      onClick={activate}
      // If the user presses TAB, inactivate the current form item.
      onKeyDown={focusOnNextField}
    />
  );
};