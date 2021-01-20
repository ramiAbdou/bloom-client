import React from 'react';

import Separator from '@atoms/Separator';
import { cx } from '@util/util';
import Form from '../Form.store';
import { FormItemData, FormItemProps } from '../Form.types';

const FormLargeTitle: React.FC<
  Pick<FormItemProps, 'category' | 'id' | 'placeholder' | 'title'>
> = ({ placeholder, ...queryArgs }: FormItemData) => {
  const error: boolean = Form.useStoreState(
    ({ getItem }) => !!getItem(queryArgs)?.errorMessage
  );

  const value = Form.useStoreState(({ getItem }) => getItem(queryArgs)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => {
    updateItem({ ...queryArgs, value: text });
  };

  const css = cx('o-form-item--large-title', {
    'o-form-item--large-title--error': error
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
