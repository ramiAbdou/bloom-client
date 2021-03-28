import React from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import { DropdownValue } from '@molecules/Dropdown/Dropdown.types';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormDropdownProps extends FormItemData {
  multiple?: boolean;
}

const FormDropdown: React.FC<FormDropdownProps> = ({ multiple, ...args }) => {
  const key = getFormItemKey(args);

  const value = FormStore.useStoreState(({ items }) => {
    return items[key]?.value;
  });

  const setValue = FormStore.useStoreActions((store) => {
    return store.setValue;
  });

  useInitFormItem(args);

  const onSelect = (result: DropdownValue) => {
    return setValue({ key, value: result });
  };

  return (
    <FormItemContainer {...args}>
      <Dropdown
        options={{ multiple }}
        value={value}
        values={args?.options}
        onSelect={onSelect}
      />
    </FormItemContainer>
  );
};

export default FormDropdown;
