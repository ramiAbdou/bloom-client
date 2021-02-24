import React from 'react';

import { BaseProps } from '@constants';

const FormSection: React.FC<BaseProps> = ({ children, show }) => {
  if (show === false) return null;
  return <div className="o-form-section mb-lg">{children}</div>;
};

export default FormSection;
