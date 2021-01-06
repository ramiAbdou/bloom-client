import React, { useEffect } from 'react';

import { cx, takeFirst } from '@util/util';
import Form from './Form.store';
import { FormItemProps } from './Form.types';
import Description from './FormDescription';
import Label from './FormLabel';
import useItemBody from './useItemBody';

const FormItem: React.FC<FormItemProps> = ({
  children,
  category,
  description,
  id,
  options,
  required,
  placeholder,
  plain,
  title,
  type,
  validate,
  value
}: FormItemProps) => {
  const setItem = Form.useStoreActions((store) => store.setItem);

  useEffect(() => {
    const emptyValue: string | string[] = takeFirst([
      [type === 'MULTIPLE_SELECT', []],
      [['SHORT_TEXT', 'LONG_TEXT'].includes(type), '']
    ]);

    setItem({
      category,
      id,
      required,
      title,
      validate,
      value: value ?? emptyValue
    });
  }, []);

  const body: React.ReactElement = useItemBody({
    category,
    children,
    id,
    options,
    placeholder,
    plain,
    required,
    title,
    type
  });

  const css = cx({
    'c-form-item': true,
    'c-form-item--email': category === 'EMAIL',
    'c-form-item--multiple-select': type === 'MULTIPLE_SELECT'
  });

  return (
    <div className={css}>
      <Label required={required}>{title}</Label>
      <Description>{description}</Description>
      {body}
    </div>
  );
};

export default FormItem;
