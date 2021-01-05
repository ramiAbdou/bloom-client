import React, { useEffect } from 'react';

import { takeFirst } from '@util/util';
import Form from './Form.store';
import { FormItemProps } from './Form.types';
import Description from './FormDescription';
import Label from './FormLabel';
import useItemBody from './useItemBody';

const FormItem: React.FC<FormItemProps> = ({
  children,
  category,
  description,
  options,
  required,
  placeholder,
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
      required,
      title,
      validate,
      value: value ?? emptyValue
    });
  }, []);

  const body: React.ReactElement = useItemBody({
    category,
    children,
    options,
    placeholder,
    required,
    title,
    type
  });

  return (
    <div className="c-form-item">
      <Label required={required}>{title}</Label>
      <Description>{description}</Description>
      {body}
    </div>
  );
};

export default FormItem;
