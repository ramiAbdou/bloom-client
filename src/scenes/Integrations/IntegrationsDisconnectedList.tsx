import deepequal from 'fast-deep-equal';
import React from 'react';

import Row from '@containers/Row/Row';
import { IIntegrations, IMemberPlan } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { IntegrationsDetailsData } from './Integrations.types';
import { buildIntegrationData } from './Integrations.util';
import IntegrationCard from './IntegrationsCard';

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const IntegrationsCardList: React.FC = () => {
  const urlName = useStoreState(({ db }) => db.community.urlName);

  const hasPaidMembership = useStoreState(({ db }) => {
    return db.community.plans?.some((planId: string) => {
      const type: IMemberPlan = db.byMemberPlanId[planId];
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

  return (
    <Row className="pt-xxs" fillBreakpoint={2} gap="sm">
      {disconnectedData.map((props: IntegrationsDetailsData) => (
        <IntegrationCard key={props.name} {...props} />
      ))}
    </Row>
  );
};

export default IntegrationsCardList;
