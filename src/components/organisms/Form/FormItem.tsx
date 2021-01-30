import React, { useEffect } from 'react';

import { cx, takeFirst } from '@util/util';
import ErrorMessage from '../../atoms/ErrorMessage';
import Form from './Form.store';
import { FormItemProps } from './Form.types';
import FormDescription from './FormDescription';
import FormLabel from './FormLabel';
import useItemBody from './useItemBody';

const FormItem: React.FC<FormItemProps> = ({
  cardOptions,
  children,
  className,
  description,
  options,
  required,
  pageId,
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

  console.log(queryArgs);

  useEffect(() => {
    const emptyValue = takeFirst([
      [type === 'MULTIPLE_SELECT', []],
      [['SHORT_TEXT', 'LONG_TEXT'].includes(type), ''],
      [type === 'TOGGLE', false]
    ]);

    value = value ?? emptyValue;

    setItem({
      initialValue: value,
      pageId,
      required,
      type,
      validate,
      value,
      ...queryArgs
    });
  }, []);

  const body: React.ReactElement = useItemBody({
    cardOptions,
    children,
    options,
    placeholder,
    plain,
    required,
    type,
    ...queryArgs
  });

  const css = cx('o-form-item', {
    [className]: className,
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
