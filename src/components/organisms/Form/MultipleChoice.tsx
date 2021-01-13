import React from 'react';

import Radio from '@molecules/Radio/Radio';
import Form from './Form.store';
import { FormItemData } from './Form.types';

export default ({ options, title }: FormItemData) => {
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  return (
    <Radio
      name={`c-form-mc-${title}`}
      options={options.map((option: string) => ({
        label: option,
        value: option
      }))}
      onSelect={(value) => updateItem({ title, value })}
    />
  );
};
