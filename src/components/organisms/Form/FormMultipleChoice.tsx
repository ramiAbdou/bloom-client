import React from 'react';

import Radio from '@molecules/Radio/Radio';
import { RadioOptionProps } from '@molecules/Radio/Radio.types';
import FormStore from './Form.store';
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
  const { options, title } = args;
  const key = getFormItemKey(args);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((state) => state.setValue);

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
        onSelect={(v) => setValue({ key, value: v })}
      />
    </FormItemContainer>
  );
};

export default FormMultipleChoice;
