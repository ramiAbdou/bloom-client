import deepequal from 'fast-deep-equal';
import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import { IIntegrations, IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardList: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community.urlName);

  const hasPaidMembership = useStoreState(({ db }) => {
    return db.community.types?.some((typeId: string) => {
      const type: IMemberType = db.byTypeId[typeId];
      return !type?.isFree;
    });
  });

  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  } = useStoreState(
    ({ db }) => db.integrations ?? {},
    deepequal
  ) as IIntegrations;

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

      <Row className="pt-xxs" fillBreakpoint={2} gap="sm">
        {disconnectedData.map((props: IntegrationsDetailsData) => (
          <IntegrationCard key={props.name} {...props} />
        ))}
      </Row>
    </>
  );
};

export default IntegrationsCardList;
