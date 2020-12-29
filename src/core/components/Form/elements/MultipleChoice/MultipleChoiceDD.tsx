import React from 'react';

import Dropdown from '@components/Elements/Dropdown/Dropdown';
import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';

export default ({ options, title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const onUpdate = (result: string[]) => updateItem({ title, value: result });

  if (!options) return null;
  return <Dropdown options={options} value={value} onUpdate={onUpdate} />;
};
