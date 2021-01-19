import React from 'react';

import Radio from '@molecules/Radio/Radio';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

const FormMultipleChoice: React.FC<FormItemData> = ({ options, title }) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  return (
    <Radio
      name={`o-form-mc-${title}`}
      options={options.map((option: string) => ({ label: option }))}
      value={value}
      onSelect={(v) => updateItem({ title, value: v })}
    />
  );
};

export default FormMultipleChoice;
