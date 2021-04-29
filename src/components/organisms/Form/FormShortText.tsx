import React from 'react';

import Input from '@components/atoms/Input/Input';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { useForm, useFormItem } from './Form.state';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormShortTextProps extends FormItemData {
  placeholder?: string;
}

const FormShortText: React.FC<FormShortTextProps> = ({
  placeholder,
  ...args
}) => {
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const { error, value } = useFormItem(key) ?? {};

  useInitFormItem({
    ...args,
    validate:
      placeholder === 'Email' || args?.title === 'Email' ? 'IS_EMAIL' : null
  });

  const updateText = (text: string): void => {
    formDispatch({ key, type: 'SET_VALUE', value: text });
  };

  return (
    <FormItemContainer {...args}>
      <Input
        error={!!error}
        placeholder={placeholder}
        value={value}
        onChange={(val) => updateText(val)}
      />
    </FormItemContainer>
  );
};

export default FormShortText;
