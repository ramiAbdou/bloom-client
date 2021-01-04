import deepequal from 'fast-deep-equal';
import React from 'react';

import { IIntegrations } from '@store/entities';
import { useStoreState } from '@store/Store';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard, {
  IntegrationCardProps
} from './IntegrationsCard/IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardContainer: React.FC = () => {
  const encodedUrlName = useStoreState(({ db }) => db.community.encodedUrlName);

  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  } = useStoreState(({ db }) => db.integrations, deepequal) as IIntegrations;

  const integrationData: IntegrationCardProps[] = buildIntegrationData({
    encodedUrlName,
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  });

  return (
    <div className="s-integrations-card-ctr">
      {integrationData.map((props: IntegrationCardProps) => (
        <IntegrationCard key={props.name} {...props} />
      ))}
    </div>
  );
};

export default IntegrationsCardContainer;
