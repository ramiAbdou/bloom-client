import deepequal from 'fast-deep-equal';
import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import { IIntegrations } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard/IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardContainer: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community.urlName);

  const hasPaidMembership = useStoreState(({ db }) => {
    return db.community.types?.some(
      (typeId: string) => !db.byTypeId[typeId]?.isFree
    );
  });

  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  } = useStoreState(({ db }) => db.integrations, deepequal) as IIntegrations;

  const integrationData: IntegrationsDetailsData[] = buildIntegrationData({
    hasPaidMembership,
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId,
    urlName
  });

  const disconnectedData: IntegrationsDetailsData[] = integrationData.filter(
    ({ connected }) => !connected
  );

  const connectedData: IntegrationsDetailsData[] = integrationData.filter(
    ({ connected }) => connected
  );

  return (
    <>
      <Show show={!!connectedData.length}>
        <div className="s-integrations-card-ctr">
          {connectedData.map((props: IntegrationsDetailsData) => (
            <IntegrationCard key={props.name} {...props} />
          ))}
        </div>

        <Separator margin={24} />
      </Show>

      <div className="s-integrations-card-ctr">
        {disconnectedData.map((props: IntegrationsDetailsData) => (
          <IntegrationCard key={props.name} {...props} />
        ))}
      </div>
    </>
  );
};

export default IntegrationsCardContainer;
