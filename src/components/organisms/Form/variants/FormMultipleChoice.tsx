import React from 'react';

import Radio from '@molecules/Radio/Radio';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

const FormMultipleChoice: React.FC<FormItemData> = ({
  cardOptions,
  options,
  ...queryArgs
}) => {
  const { title } = queryArgs;
  const value = Form.useStoreState(({ getItem }) => getItem(queryArgs)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  return (
    <Radio
      card={!!cardOptions}
      name={`o-form-mc-${title}`}
      options={
        cardOptions ?? options.map((option: string) => ({ label: option }))
      }
      value={value}
      onSelect={(v) => updateItem({ ...queryArgs, value: v })}
    />
  );
};

export default FormMultipleChoice;
