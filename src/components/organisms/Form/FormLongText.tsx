import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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

  const updateText = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ key, value: target.value });
  };

  const css = cx('c-misc-input c-misc-input--lg', {
    'c-misc-input--error': !!error
  });

  return (
    <FormItemContainer {...args}>
      <TextareaAutosize
        className={css}
        minRows={4}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={updateText}
      />
    </FormItemContainer>
  );
};

export default FormLongText;
