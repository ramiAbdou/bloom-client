import React from 'react';

import Separator from '@components/atoms/Separator';
import Row from '@components/containers/Row/Row';
import Show from '@components/containers/Show';
import { ICommunity } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreState } from '@core/store/Store';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsConnectedList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

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

  const connectedData: IntegrationsDetailsData[] = integrationData.filter(
    ({ connected }) => connected
  );

  return (
    <Show show={!!connectedData?.length}>
      <Row className="pt-xxs" fillBreakpoint={2} gap="sm">
        {connectedData.map((props: IntegrationsDetailsData) => (
          <IntegrationCard key={props.name} {...props} />
        ))}
      </Row>

      <Separator margin={24} />
    </Show>
  );
};

export default IntegrationsConnectedList;
