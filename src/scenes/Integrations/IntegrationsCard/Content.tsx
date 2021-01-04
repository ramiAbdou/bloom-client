import React from 'react';

import StatusTag from '@atoms/Tags/StatusTag';

export type IntegrationCardProps = {
  connected?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationCardHeader: React.FC<Pick<
  IntegrationCardProps,
  'connected' | 'logo'
>> = ({ connected, logo }) => (
  <div className="s-integrations-card-header">
    <img alt="Company Logo" className="s-integrations-icon" src={logo} />
    {connected && <StatusTag positive>Connected</StatusTag>}
  </div>
);

const IntegrationCardContent: React.FC<Omit<IntegrationCardProps, 'href'>> = ({
  connected,
  description,
  logo,
  name
}) => (
  <div>
    <IntegrationCardHeader connected={connected} logo={logo} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

export default IntegrationCardContent;
