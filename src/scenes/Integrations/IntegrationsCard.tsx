import React from 'react';

import Card from '@containers/Card/Card';
import { IntegrationsDetailsData } from './Integrations.types';
import IntegrationCardButton from './IntegrationsCardButton';
import IntegrationCardContent from './IntegrationsCardContent';

const IntegrationCard: React.FC<IntegrationsDetailsData> = (props) => {
  return (
    <Card className="w-5">
      <IntegrationCardContent {...props} />
      <IntegrationCardButton {...props} />
    </Card>
  );
};

export default IntegrationCard;
