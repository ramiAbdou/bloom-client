import React from 'react';

import Input from '@atoms/Input';
import Form from './Form.store';
import { FormItemData } from './Form.types';

export default ({ category, placeholder, title }: FormItemData) => {
  const value = Form.useStoreState(
    ({ getItem }) => getItem({ category, title })?.value
  );

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
