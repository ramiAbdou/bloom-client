import React from 'react';

import Input from '@atoms/Input/Input';
import { FormItemData } from '@organisms/Form/Form.types';
import FormStore from './Form.store';
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
  const key = getFormItemKey(args);
  const error = FormStore.useStoreState(({ items }) => items[key]?.error);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);

  useInitFormItem({
    ...args,
    validate:
      placeholder === 'Email' || args?.title === 'Email' ? 'IS_EMAIL' : null
  });

  const updateText = (text: string) => setValue({ key, value: text });

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
