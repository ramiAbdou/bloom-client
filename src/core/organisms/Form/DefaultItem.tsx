import React from 'react';

import { FormItemProps } from './Form.types';
import useItemBody from './useItemBody';
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
