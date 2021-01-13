import React from 'react';

import Form from './Form.store';
import { FormItemData, FormItemProps } from './Form.types';

const FormLongText: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ category, id, placeholder, title }: FormItemData) => {
  const value = Form.useStoreState(
    ({ getItem }) => getItem({ category, id, title }).value
  );

  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const updateText = (text: string) => updateItem({ title, value: text });

  return (
    <textarea
      className="c-misc-input c-misc-input--lg"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={({ target }) => updateText(target.value)}
    />
  );
};

export default FormLongText;
