import React from 'react';

import { BaseProps } from '@util/constants';

const FormSection: React.FC<BaseProps> = ({ children, show }) => {
  if (show === false) return null;
  return <div className="o-form-section mb-lg--nlc">{children}</div>;
};

export default FormSection;
