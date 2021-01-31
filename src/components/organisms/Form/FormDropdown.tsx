import React from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
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
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  useInitFormItem(args);

  const onUpdate = (result: string[]) => setValue({ key, value: result });

  return (
    <FormItemContainer {...args}>
      <Dropdown
        multiple={multiple}
        options={args?.options}
        value={value}
        onUpdate={onUpdate}
      />
    </FormItemContainer>
  );
};

export default FormDropdown;
