import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { cx } from '@util/util';
import { useForm, useFormItem } from './Form.state';
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
  const [, formDispatch] = useForm();

  const key: string = getFormItemKey(args);
  const { error, value } = useFormItem(key) ?? {};

  useInitFormItem(args);

  const updateText = ({
    target
  }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    formDispatch({ key, type: 'SET_VALUE', value: target.value });
  };

  const css: string = cx('c-misc-input c-misc-input--lg', {
    'c-misc-input--error': !!error
  });

  return (
    <FormItemContainer {...args}>
      <TextareaAutosize
        className={css}
        minRows={4}
        placeholder={placeholder}
        value={(value as string) ?? ''}
        onChange={updateText}
      />
    </FormItemContainer>
  );
};

export default FormLongText;
