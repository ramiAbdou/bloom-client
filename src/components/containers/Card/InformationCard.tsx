import React from 'react';

import { TitleProps } from '@constants';

interface InformationCardProps extends TitleProps {
  description: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  description,
  title
}) => {
  return (
    <div className="t-misc-card--information">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default InformationCard;
