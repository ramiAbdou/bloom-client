import React from 'react';

import Card from '@components/Elements/Card/Card';
import IntegrationCardButton from './Button';
import IntegrationCardContent from './Content';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationCard: React.FC<IntegrationCardProps> = (props) => (
  <Card className="s-integrations-card">
    <IntegrationCardContent {...props} />

    <div>
      <IntegrationCardButton {...props} />
    </div>
  </Card>
);

export default IntegrationCard;
