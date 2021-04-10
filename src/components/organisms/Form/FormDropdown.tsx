import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { DropdownValue } from '@components/molecules/Dropdown/Dropdown.types';
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
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((state) => state.setValue);

  useInitFormItem(args);

  const onSelect = (result: DropdownValue) => setValue({ key, value: result });

  return (
    <FormItemContainer {...args}>
      <Dropdown
        options={{ multiple }}
        value={value as string[]}
        values={args?.options}
        onSelect={onSelect}
      />
    </FormItemContainer>
  );
};

export default FormDropdown;
