import React, { useEffect } from 'react';

import { takeFirst } from '@util/util';
import Form from '../Form.store';
import { FormItemProps } from '../Form.types';
import { getItemBody } from '../Form.util';
import Description from './Description';
import Label from './Label';

export default ({
  children,
  category,
  description,
  options,
  required,
  placeholder,
  title,
  type,
  validate
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
      value: emptyValue
    });
  }, []);

  const body: React.ReactElement = getItemBody({
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
