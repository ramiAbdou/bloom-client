import React from 'react';

import Separator from '@atoms/Separator';
import { cx } from '@util/util';
import Form from './Form.store';
import { FormItemData } from './Form.types';

interface FormLargeTitleProps extends FormItemData {
  placeholder?: string;
}

const FormLargeTitle: React.FC<FormLargeTitleProps> = ({
  placeholder,
  ...args
}) => {
  const error: boolean = Form.useStoreState(
    ({ getItem }) => !!getItem(args)?.errorMessage
  );

  const value = Form.useStoreState(({ getItem }) => getItem(args)?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => updateItem({ ...args, value: text });

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
