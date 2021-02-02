import React from 'react';

import { TitleProps } from '@constants';

interface FormHeaderProps extends TitleProps {
  description?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ description, title }) => {
  return (
    <header className="o-form-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
};

export default FormHeader;
