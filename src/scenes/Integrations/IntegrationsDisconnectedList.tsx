import React from 'react';

import Row from '@components/containers/Row/Row';
import { useStoreState } from '@core/store/Store';
import { ICommunity } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { communityIntegrations, urlName } = useFindOne(ICommunity, {
    fields: [
      'communityIntegrations.id',
      'communityIntegrations.mailchimpListId',
      'communityIntegrations.stripeAccountId',
      'urlName'
    ],
    where: { id: communityId }
  });

  const integrationData: IntegrationsDetailsData[] = buildIntegrationData({
    isMailchimpAuthenticated: !!communityIntegrations.mailchimpListId,
    mailchimpListId: communityIntegrations.mailchimpListId,
    stripeAccountId: communityIntegrations.stripeAccountId,
    urlName
  });

  const disconnectedData: IntegrationsDetailsData[] = integrationData.filter(
    ({ connected }) => !connected
  );

  return (
    <Row className="pt-xxs" fillBreakpoint={2} gap="sm">
      {disconnectedData.map((props: IntegrationsDetailsData) => (
        <IntegrationCard key={props.name} {...props} />
      ))}
    </Row>
  );
};

export default IntegrationsCardList;
