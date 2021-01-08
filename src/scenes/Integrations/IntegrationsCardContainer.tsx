import deepequal from 'fast-deep-equal';
import React from 'react';

import Separator from '@atoms/Separator';
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
  const hasPaidMembership = useStoreState(({ db }) => db.hasPaidMembership);

  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  } = useStoreState(({ db }) => db.integrations, deepequal) as IIntegrations;

  const integrationData: IntegrationCardProps[] = buildIntegrationData({
    encodedUrlName,
    hasPaidMembership,
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  });

  const disconnectedData: IntegrationCardProps[] = integrationData.filter(
    ({ connected }) => !connected
  );

  const connectedData: IntegrationCardProps[] = integrationData.filter(
    ({ connected }) => connected
  );

  return (
    <>
      {!!connectedData.length && (
        <>
          <div className="s-integrations-card-ctr">
            {connectedData.map((props: IntegrationCardProps) => (
              <IntegrationCard key={props.name} {...props} />
            ))}
          </div>

          <Separator margin={24} />
        </>
      )}

      <div className="s-integrations-card-ctr">
        {disconnectedData.map((props: IntegrationCardProps) => (
          <IntegrationCard key={props.name} {...props} />
        ))}
      </div>
    </>
  );
};

export default IntegrationsCardContainer;
