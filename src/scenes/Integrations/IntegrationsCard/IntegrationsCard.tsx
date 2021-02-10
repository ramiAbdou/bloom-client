import React from 'react';

import Card from '@containers/Card/Card';
import { IntegrationsDetailsData } from '../Integrations.types';
import IntegrationCardButton from './IntegrationsCardButton';
import IntegrationCardContent from './IntegrationsCardContent';

const IntegrationCard: React.FC<IntegrationsDetailsData> = (props) => (
  <Card className="s-integrations-card">
    <IntegrationCardContent {...props} />
    <IntegrationCardButton {...props} />
  </Card>
);

export default IntegrationCard;
