import deepequal from 'fast-deep-equal';
import React from 'react';

import ErrorMessage from '@atoms/ErrorMessage';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormItemData } from './Form.types';
import FormDescription from './FormDescription';
import FormLabel from './FormLabel';

const FormItemContainer: React.FC<FormItemData> = ({
  className,
  children,
  ...queryArgs
}) => {
  const {
    description,
    errorMessage,
    required,
    title
  }: FormItemData = FormStore.useStoreState(
    ({ getItem }) => getItem(queryArgs) ?? {},
    deepequal
  );

  const css = cx('o-form-item', { [className]: className });

  return (
    <div className={css}>
      <FormLabel required={required}>{title}</FormLabel>
      <FormDescription>{description}</FormDescription>
      {children}
      <ErrorMessage marginBottom={16}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default FormItemContainer;
