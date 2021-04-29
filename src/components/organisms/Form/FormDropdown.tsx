import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { DropdownValue } from '@components/molecules/Dropdown/Dropdown.types';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormDropdownProps extends FormItemData {
  multiple?: boolean;
}

const FormDropdown: React.FC<FormDropdownProps> = ({ multiple, ...args }) => {
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const value: string[] = useFormItem(key)?.value as string[];

  useInitFormItem(args);

  const onSelect = (result: DropdownValue): void => {
    formDispatch({ key, type: 'SET_VALUE', value: result });
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
