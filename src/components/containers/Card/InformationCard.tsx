import React from 'react';

import { TitleProps } from '@util/constants';

interface InformationCardProps extends TitleProps {
  description: string;
  show?: boolean;
}

const InformationCard: React.FC<InformationCardProps> = ({
  description,
  show,
  title
}) => {
  if (show === false) return null;

  return (
    <div className="t-card--information">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default InformationCard;
