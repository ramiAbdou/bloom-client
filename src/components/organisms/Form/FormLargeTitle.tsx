import React from 'react';

import Separator from '@atoms/Separator';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';

interface FormLargeTitleProps extends FormItemData {
  placeholder?: string;
}

const FormLargeTitle: React.FC<FormLargeTitleProps> = ({
  placeholder,
  ...args
}) => {
  const key = getFormItemKey(args);
  const error = FormStore.useStoreState(({ items }) => items[key]?.error);
  const value = FormStore.useStoreState(({ items }) => items[key]?.value);
  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => updateItem({ ...args, value: text });

  const css = cx('o-form-item--large-title', {
    'o-form-item--large-title--error': !!error
  });

  return (
    <>
      <textarea
        className={css}
        placeholder={placeholder}
        rows={1}
        value={value ?? ''}
        onChange={({ target }) => updateText(target.value)}
      />

      <Separator marginTop={0} />
    </>
  );
};

export default FormLargeTitle;
