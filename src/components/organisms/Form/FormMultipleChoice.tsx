import React from 'react';

import Radio from '@components/molecules/Radio/Radio';
import { RadioOptionProps } from '@components/molecules/Radio/Radio.types';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormMultipleChoiceProps extends FormItemData {
  card?: boolean;
  // Only populated if the type is MUTLIPLE CHOICE or MULTIPLE SELECT.
  cardOptions?: RadioOptionProps[];
}

const FormMultipleChoice: React.FC<FormMultipleChoiceProps> = ({
  card,
  cardOptions,
  ...args
}) => {
  const [, formDispatch] = useForm();

  const { options, title } = args;
  const key: string = getFormItemKey(args);
  const value: string = useFormItem(key)?.value as string;

  useInitFormItem(args);

  return (
    <FormItemContainer {...args}>
      <Radio
        card={!!card || !!cardOptions}
        name={`o-form-mc-${title}`}
        options={
          cardOptions ??
          options.map((option: string) => {
            return { label: option };
          })
        }
        value={value}
        onSelect={(v) => formDispatch({ key, type: 'SET_VALUE', value: v })}
      />
    </FormItemContainer>
  );
};

export default FormMultipleChoice;
