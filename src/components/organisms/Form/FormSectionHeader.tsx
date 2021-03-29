import React from 'react';

import { TitleProps } from '@util/constants';

interface FormSectionHeaderProps extends TitleProps {
  description?: string;
}

const FormSectionHeader: React.FC<FormSectionHeaderProps> = ({
  description,
  title
}) => (
  <div className="mb-md--nlc">
    {title && <h2 className="mb-xs--nlc">{title}</h2>}
    {description && <p>{description}</p>}
  </div>
);

export default FormSectionHeader;
