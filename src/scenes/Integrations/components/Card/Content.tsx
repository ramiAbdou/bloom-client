import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationConnectedTag: React.FC<Pick<
  IntegrationCardProps,
  'completed'
>> = ({ completed }) => {
  if (!completed) return null;
  return (
    <div className="s-integrations-connected">
      <IoCheckmarkCircle />
      <p>Connected</p>
    </div>
  );
};

const IntegrationCardHeader: React.FC<Pick<
  IntegrationCardProps,
  'completed' | 'logo'
>> = ({ completed, logo }) => {
  return (
    <div className="s-integrations-card-header">
      <img alt="Company Logo" className="s-integrations-icon" src={logo} />
      <IntegrationConnectedTag completed={completed} />
    </div>
  );
};

const IntegrationCardContent: React.FC<Omit<IntegrationCardProps, 'href'>> = ({
  completed,
  description,
  logo,
  name
}) => (
  <div>
    <IntegrationCardHeader completed={completed} logo={logo} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

export default IntegrationCardContent;
