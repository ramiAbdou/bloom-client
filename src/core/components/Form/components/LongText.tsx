/**
 * @fileoverview Component: LongText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React from 'react';

import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const updateText = (text: string) => updateItem({ title, value: text });

  return (
    <textarea
      className="c-misc-input c-misc-input--lg"
      value={value ?? ''}
      onChange={({ target }) => updateText(target.value)}
    />
  );
};
