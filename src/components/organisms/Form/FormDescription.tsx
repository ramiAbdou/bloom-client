import React from 'react';

import { ChildrenProps } from '@constants';

const FormDescription: React.FC<ChildrenProps> = ({ children }) => {
  if (!children) return null;
  return <p className="o-form-desc">{children}</p>;
};

export default FormDescription;
