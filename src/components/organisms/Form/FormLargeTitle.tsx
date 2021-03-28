import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Separator from '@atoms/Separator';
import { cx } from '@util/util';
import FormStore from './Form.store';
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
  const key = getFormItemKey(args);

  const error = FormStore.useStoreState(({ items }) => {
    return items[key]?.error;
  });

  const value = FormStore.useStoreState(({ items }) => {
    return items[key]?.value;
  });

  const setValue = FormStore.useStoreActions((state) => {
    return state.setValue;
  });

  useInitFormItem(args);

  const updateText = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ key, value: target.value });
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
