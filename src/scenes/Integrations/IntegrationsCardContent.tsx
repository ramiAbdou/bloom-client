import React from 'react';

import StatusTag from '@atoms/Tag/StatusTag';
import Row from '@containers/Row/Row';

export type IntegrationCardProps = {
  connected?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationCardHeader: React.FC<
  Pick<IntegrationCardProps, 'connected' | 'logo'>
> = ({ connected, logo }) => {
  return (
    <Row className="mb-sm--nlc" justify="sb">
      <img alt="Company Logo" className="s-integrations-icon" src={logo} />
      {connected && <StatusTag positive>Connected</StatusTag>}
    </Row>
  );
};

const IntegrationCardContent: React.FC<Omit<IntegrationCardProps, 'href'>> = ({
  connected,
  description,
  logo,
  name
}) => {
  return (
    <>
      <IntegrationCardHeader connected={connected} logo={logo} />
      <h3 className="mb-xs--nlc">{name}</h3>
      <p className="mb-sm--nlc">{description}</p>
    </>
  );
};

export default IntegrationCardContent;
