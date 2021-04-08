import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import { ICommunity } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { useStoreState } from '@store/Store';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsConnectedList: React.FC = () => {
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
