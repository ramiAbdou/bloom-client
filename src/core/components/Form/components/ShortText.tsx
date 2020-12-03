import React from 'react';

import Input from '@components/Misc/Input';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const updateText = (text: string) => updateItem({ title, value: text });

  return (
    <Input value={value} onChange={({ target }) => updateText(target.value)} />
  );
};
