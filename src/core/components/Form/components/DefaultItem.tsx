import React from 'react';

import { FormItemProps } from '../Form.types';
import { getItemBody } from '../Form.util';
import Description from './Description';
import Label from './Label';

export default ({
  children,
  category,
  description,
  options,
  placeholder,
  required,
  title,
  type
}: FormItemProps) => {
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
