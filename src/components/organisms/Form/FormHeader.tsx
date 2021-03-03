import React from 'react';

import { TitleProps } from '@util/constants';

interface FormHeaderProps extends TitleProps {
  h2?: boolean;
  description?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ description, h2, title }) => {
  return (
    <header className="o-form-header">
      {!h2 && <h1>{title}</h1>}
      {h2 && <h2>{title}</h2>}
      <p>{description}</p>
    </header>
  );
};

export default FormHeader;
