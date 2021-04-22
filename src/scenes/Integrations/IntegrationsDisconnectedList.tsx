import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ICommunity } from '@util/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardList: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: [
      'communityIntegrations.id',
      'communityIntegrations.mailchimpListId',
      'communityIntegrations.stripeAccountId',
      'urlName'
    ],
    where: { id: communityId }
  });

  if (loading) return null;

  const integrationData: IntegrationsDetailsData[] = buildIntegrationData({
    isMailchimpAuthenticated: !!community.communityIntegrations.mailchimpListId,
    mailchimpListId: community.communityIntegrations.mailchimpListId,
    stripeAccountId: community.communityIntegrations.stripeAccountId,
    urlName: community.urlName
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
