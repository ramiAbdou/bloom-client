import React from 'react';

import ErrorMessage from '@atoms/ErrorMessage';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import FormDescription from './FormDescription';

const FormItemContainer: React.FC<FormItemData> = ({
  className,
  children,
  ...queryArgs
}) => {
  const description = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.description
  );

  const errorMessage = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.errorMessage
  );

  const css = cx('o-form-item', { [className]: className });

  return (
    <div className={css}>
      <FormDescription>{description}</FormDescription>
      {children}
      <ErrorMessage marginBottom={16}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default FormItemContainer;
