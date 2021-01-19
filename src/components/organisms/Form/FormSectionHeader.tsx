import React from 'react';

import { ChildrenProps } from '@constants';

const FormSectionHeader: React.FC<ChildrenProps> = ({ children }) => {
  return <h2 className="o-form-section-header">{children}</h2>;
};

export default FormSectionHeader;
