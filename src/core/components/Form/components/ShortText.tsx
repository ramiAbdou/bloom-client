import React from 'react';

import Input from '@components/Elements/Input';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ placeholder, title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => updateItem({ title, value: text });

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(val) => updateText(val)}
    />
  );
};
