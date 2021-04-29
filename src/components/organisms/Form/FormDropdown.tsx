import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { toArray } from '@util/util';
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
  const value: string | string[] = useFormItem(key)?.value as string | string[];

  useInitFormItem(args);

  const onSelect = (result: string | string[]): void => {
    formDispatch({ key, type: 'SET_VALUE', value: result });
  };

  const selectedValues: string[] = toArray(value);

  return (
    <FormItemContainer {...args}>
      <Dropdown
        options={{ multiple }}
        selectedValues={selectedValues}
        values={args?.options}
        onSelect={onSelect}
      />
    </FormItemContainer>
  );
};

export default FormDropdown;
