import React from 'react';

import { cx } from '@util/util';
import FormStore from '../Form.store';
import { FormItemData, FormItemProps } from '../Form.types';

const FormLongText: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ placeholder, ...queryArgs }: FormItemData) => {
  const error: boolean = FormStore.useStoreState(
    ({ getItem }) => !!getItem(queryArgs)?.errorMessage
  );

  const value = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.value
  );

  const updateItem = FormStore.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => {
    updateItem({ ...queryArgs, value: text });
  };

  const css = cx('c-misc-input c-misc-input--lg', {
    'c-misc-input--error': error
  });

  return (
    <textarea
      className={css}
      placeholder={placeholder}
      value={value ?? ''}
      onChange={({ target }) => updateText(target.value)}
    />
  );
};

export default FormLongText;
