import React from 'react';

import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormLongTextProps extends FormItemData {
  placeholder?: string;
}

const FormLongText: React.FC<FormLongTextProps> = ({
  placeholder,
  ...args
}) => {
  const error: boolean = FormStore.useStoreState(
    ({ getItem }) => !!getItem(args)?.errorMessage
  );

  const value = FormStore.useStoreState(({ getItem }) => getItem(args)?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);
  useInitFormItem(args);

  const updateText = (text: string) => updateItem({ ...args, value: text });

  const css = cx('c-misc-input c-misc-input--lg', {
    'c-misc-input--error': error
  });

  return (
    <FormItemContainer {...args}>
      <textarea
        className={css}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={({ target }) => updateText(target.value)}
      />
    </FormItemContainer>
  );
};

export default FormLongText;
