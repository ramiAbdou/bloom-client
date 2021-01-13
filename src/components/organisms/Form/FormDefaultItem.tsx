import React from 'react';

import { FormItemProps } from './Form.types';
import Description from './FormDescription';
import Label from './FormLabel';
import useItemBody from './useItemBody';

const FormDefaultItem: React.FC<FormItemProps> = ({
  children,
  category,
  description,
  options,
  placeholder,
  required,
  title,
  type
}) => {
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

export default FormDefaultItem;
