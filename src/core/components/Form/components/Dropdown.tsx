import React from 'react';

import Dropdown from '@components/Elements/Dropdown/Dropdown';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

interface FormDropdownProps extends Pick<FormItemData, 'options' | 'title'> {
  multiple?: boolean;
}

export default ({ multiple, options, title }: FormDropdownProps) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);
  const onUpdate = (result: string[]) => updateItem({ title, value: result });

  if (!options) return null;

  return (
    <Dropdown
      multiple={multiple}
      options={options}
      value={value}
      onUpdate={onUpdate}
    />
  );
};
