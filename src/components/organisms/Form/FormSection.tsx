import React from 'react';

import { ChildrenProps, TitleProps } from '@constants';

interface FormSectionProps extends ChildrenProps, TitleProps {}

const FormSection: React.FC<FormSectionProps> = ({ children, title }) => {
  return (
    <div className="o-form-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormSection;
