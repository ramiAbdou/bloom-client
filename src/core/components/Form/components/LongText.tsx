/**
 * @fileoverview Component: LongText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React from 'react';

import CSSModifier from '@util/CSSModifier';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ maxCharacters, title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => {
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    if (maxCharacters && text.length > maxCharacters) return;
    updateItem({ title, value: text });
  };

  const { css } = new CSSModifier()
    .class('c-form-input')
    .class('c-form-input--lg');

  return (
    <textarea
      className={css}
      value={value ?? ''}
      onChange={({ target }) => updateText(target.value)}
    />
  );
};
