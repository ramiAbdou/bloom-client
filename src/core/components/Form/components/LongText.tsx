/**
 * @fileoverview Component: LongText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import CSSModifier from '@util/CSSModifier';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ maxCharacters, placeholder, title }: FormItemData) => {
  const primaryColor = Form.useStoreState((store) => store.primaryColor);
  const submitOnEnter = Form.useStoreState((store) => store.submitOnEnter);
  const submitForm = Form.useStoreState((store) => store.submitForm);
  const { isActive, value } = Form.useStoreState(({ getItem }) =>
    getItem({ title })
  );

  const next = Form.useStoreActions((store) => store.next);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const activate = () => updateItem({ isActive: true, title });
  const inactivate = () => updateItem({ isActive: false, title });

  const textareaRef: React.MutableRefObject<HTMLTextAreaElement> = useRef(null);

  useEffect(() => {
    if (isActive) textareaRef.current.focus();
  }, [isActive]);

  useOnClickOutside(textareaRef, () => isActive && inactivate());

  const updateText = (text: string) => {
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    if (maxCharacters && text.length > maxCharacters) return;
    updateItem({ title, value: text });
  };

  const onKeyDown = async ({ keyCode }: React.KeyboardEvent<HTMLElement>) => {
    if (keyCode === 9) next(title);
    if (keyCode === 13 && submitOnEnter) await submitForm();
  };

  const { css } = new CSSModifier()
    .class('c-form-input')
    .class('c-form-input--lg');

  const style = isActive ? { border: `1px ${primaryColor} solid` } : {};

  return (
    <textarea
      ref={textareaRef}
      className={css}
      placeholder={placeholder ?? ''}
      style={style}
      value={value ?? ''}
      onChange={({ target }) => updateText(target.value)}
      onClick={activate}
      // If the user presses TAB, inactivate the current form item.
      onKeyDown={onKeyDown}
    />
  );
};
