import React, { useEffect } from 'react';

import { cx } from '@util/util';
import ErrorMessage from '../../atoms/ErrorMessage';
import Form from './Form.store';
import { FormItemProps } from './Form.types';
import FormDescription from './FormDescription';
import FormLabel from './FormLabel';
import useItemBody from './useItemBody';

const FormItem: React.FC<FormItemProps> = ({
  children,
  description,
  options,
  required,
  plain,
  type,
  validate,
  value,
  ...queryArgs
}: FormItemProps) => {
  const { category, title } = queryArgs;

  const errorMessage = Form.useStoreState(
    ({ getItem }) => getItem(queryArgs)?.errorMessage
  );

  const setItem = Form.useStoreActions((store) => store.setItem);

  useEffect(() => {
    const emptyValue =
      (type === 'MULTIPLE_SELECT' && []) || (type === 'TOGGLE' && false) || '';

    value = value ?? emptyValue;

    if (type === 'MULTIPLE_CHOICE' && options?.length < 5) return;
    if (type === 'SHORT_TEXT') return;
    if (type === 'LONG_TEXT') return;

    setItem({
      initialValue: value,
      required,
      type,
      validate,
      value,
      ...queryArgs
    });
  }, []);

  const body: React.ReactElement = useItemBody({
    children,
    options,
    plain,
    required,
    type,
    ...queryArgs
  });

  const css = cx('o-form-item', {
    'o-form-item--date': type === 'DATE' || type === 'TIME',
    'o-form-item--email': category === 'EMAIL',
    'o-form-item--image': type === 'IMAGE',
    'o-form-item--multiple-select': type === 'MULTIPLE_SELECT'
  });

  return (
    <div className={css}>
      {type !== 'TOGGLE' && type !== 'COVER_IMAGE' && (
        <FormLabel required={required}>{title}</FormLabel>
      )}
      {type !== 'TOGGLE' && <FormDescription>{description}</FormDescription>}
      {body}
      {type === 'TOGGLE' && <FormDescription>{description}</FormDescription>}
      <ErrorMessage marginBottom={16}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default FormItem;
