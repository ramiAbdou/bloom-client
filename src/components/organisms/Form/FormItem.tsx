import React, { useEffect } from 'react';

import { cx, takeFirst } from '@util/util';
import ErrorMessage from '../../atoms/ErrorMessage';
import Form from './Form.store';
import { FormItemProps } from './Form.types';
import FormDescription from './FormDescription';
import FormLabel from './FormLabel';
import useItemBody from './useItemBody';

const FormItem: React.FC<FormItemProps> = ({
  card,
  cardOptions,
  children,
  description,
  options,
  required,
  page,
  placeholder,
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
    const emptyValue = takeFirst([
      [type === 'MULTIPLE_SELECT', []],
      [['SHORT_TEXT', 'LONG_TEXT'].includes(type), ''],
      [type === 'TOGGLE', false]
    ]);

    value = value ?? emptyValue;

    setItem({
      initialValue: value,
      page,
      required,
      type,
      validate,
      value,
      ...queryArgs
    });
  }, []);

  const body: React.ReactElement = useItemBody({
    card,
    cardOptions,
    children,
    options,
    placeholder,
    plain,
    required,
    type,
    ...queryArgs
  });

  const css = cx({
    'o-form-item': true,
    'o-form-item--email': category === 'EMAIL',
    'o-form-item--image': type === 'IMAGE',
    'o-form-item--multiple-select': type === 'MULTIPLE_SELECT'
  });

  return (
    <div className={css}>
      {type !== 'TOGGLE' && <FormLabel required={required}>{title}</FormLabel>}
      {type !== 'TOGGLE' && <FormDescription>{description}</FormDescription>}
      {body}
      {type === 'TOGGLE' && <FormDescription>{description}</FormDescription>}
      <ErrorMessage marginBottom={16} message={errorMessage} />
    </div>
  );
};

export default FormItem;
