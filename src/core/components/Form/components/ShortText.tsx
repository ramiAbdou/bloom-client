import React from 'react';

import Input from '@components/Misc/Input';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ placeholder, title }: FormItemData) => {
  const isLastItem = Form.useStoreState(({ items }) => {
    return items.findIndex((item) => item.title === title) >= 0;
  });

  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const submitForm = Form.useStoreState((store) => store.submitForm);

  const onEnter = async () => isLastItem && submitForm();
  const updateText = (text: string) => updateItem({ title, value: text });

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => updateText(target.value)}
      onEnter={onEnter}
    />
  );
};
