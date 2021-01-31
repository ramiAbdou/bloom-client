import React from 'react';

import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormLongTextProps extends FormItemData {
  placeholder?: string;
}

const FormLongText: React.FC<FormLongTextProps> = ({
  placeholder,
  ...args
}) => {
  const key = getFormItemKey(args);
  const error = FormStore.useStoreState(({ items }) => items[key]?.error);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const setValue = FormStore.useStoreActions((store) => store.setValue);
  useInitFormItem(args);

  const updateText = (text: string) => setValue({ key, value: text });

  const css = cx('c-misc-input c-misc-input--lg', {
    'c-misc-input--error': !!error
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
