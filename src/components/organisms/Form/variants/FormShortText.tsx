import React from 'react';

import Input from '@atoms/Input/Input';
import Form from '../Form.store';
import { FormItemProps } from '../Form.types';

const FormShortText: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ placeholder, ...queryArgs }) => {
  const error: boolean = Form.useStoreState(
    ({ getItem }) => !!getItem(queryArgs)?.errorMessage
  );

  const value = Form.useStoreState(({ getItem }) => getItem(queryArgs)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => {
    updateItem({ ...queryArgs, value: text });
  };

  return (
    <Input
      error={error}
      placeholder={placeholder}
      value={value}
      onChange={(val) => updateText(val)}
    />
  );
};

export default FormShortText;
