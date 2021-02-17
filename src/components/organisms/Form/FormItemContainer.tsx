import React from 'react';

import ErrorMessage from '@atoms/ErrorMessage';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import { getFormItemKey } from './Form.util';
import FormDescription from './FormDescription';
import FormLabel from './FormLabel';

const FormItemContainer: React.FC<FormItemData> = ({
  className,
  children,
  description,
  title,
  ...args
}) => {
  const key = getFormItemKey(args);
  const error = FormStore.useStoreState(({ items }) => items[key]?.error);
  const required = FormStore.useStoreState(({ items }) => items[key]?.required);

  const css = cx('o-form-item', {}, className);

  return (
    <div className={css}>
      <FormLabel required={required}>{title}</FormLabel>
      <FormDescription>{description}</FormDescription>
      {children}
      <ErrorMessage marginBottom={16} marginTop={16}>
        {error}
      </ErrorMessage>
    </div>
  );
};

export default FormItemContainer;
