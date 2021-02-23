import React from 'react';

import { TitleProps } from '@constants';

const FormSection: React.FC<TitleProps> = ({ children, title }) => {
  return (
    <div className="o-form-section">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default FormSection;
