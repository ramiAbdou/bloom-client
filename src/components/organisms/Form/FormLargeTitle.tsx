import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Separator from '@components/atoms/Separator';
import { cx } from '@util/util';
import { useForm, useFormItem } from './Form.state';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormItemContainer from './FormItemContainer';
import useInitFormItem from './useInitFormItem';

interface FormLargeTitleProps extends FormItemData {
  placeholder?: string;
}

const FormLargeTitle: React.FC<FormLargeTitleProps> = ({
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

  const css: string = cx('o-form-item--large-title', {
    'o-form-item--large-title--error': !!error
  });

  return (
    <FormItemContainer {...args}>
      <TextareaAutosize
        className={css}
        placeholder={placeholder}
        rows={1}
        value={(value as string) ?? ''}
        onChange={updateText}
      />

      <Separator marginTop={0} />
    </FormItemContainer>
  );
};

export default FormLargeTitle;
