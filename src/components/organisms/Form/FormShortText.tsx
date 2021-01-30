import React from 'react';

import Input from '@atoms/Input/Input';
import { FormItemData } from '@organisms/Form/Form.types';
import FormStore from './Form.store';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormShortTextProps extends FormItemData {
  placeholder?: string;
}

const FormShortText: React.FC<FormShortTextProps> = ({
  placeholder,
  ...args
}) => {
  const error: boolean = FormStore.useStoreState(
    ({ getItem }) => !!getItem(args)?.errorMessage
  );

  const value = FormStore.useStoreState(({ getItem }) => getItem(args)?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  useInitFormItem({
    ...args,
    validate:
      placeholder === 'Email' || args?.title === 'Email' ? 'IS_EMAIL' : null
  });

  const updateText = (text: string) => updateItem({ ...args, value: text });

  return (
    <FormItemContainer {...args}>
      <Input
        error={error}
        placeholder={placeholder}
        value={value}
        onChange={(val) => updateText(val)}
      />
    </FormItemContainer>
  );
};

export default FormShortText;
