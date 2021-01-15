import React from 'react';

import Radio from '@molecules/Radio/Radio';
import Form from './Form.store';
import { FormItemData } from './Form.types';

const FormMultipleChoice: React.FC<FormItemData> = ({
  card,
  cardOptions,
  id
}) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ id })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  return (
    <Radio
      card={card}
      name={`o-form-mc-${id}`}
      options={cardOptions}
      value={value}
      onSelect={(v) => updateItem({ id, value: v })}
    />
  );
};

export default FormMultipleChoice;
