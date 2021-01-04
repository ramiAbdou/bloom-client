import MainHeader from 'core/templates/Main/Header';
import React, { useEffect } from 'react';

import MainContent from '@templates/Main/Content';
import MailchimpDetails from './components/ExpandedDetails/MailchimpDetails';
import StripeDetails from './components/ExpandedDetails/StripeDetails';
import MailchimpFlow from './components/MailchimpModal/MailchimpModal';
import useFetchIntegrations from './hooks/useFetchIntegrations';
import Integrations, { IntegrationsModal } from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';

const IntegrationModal = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = Integrations.useStoreState((store) => store.flow);
  const setFlow = Integrations.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    if (searchParam && searchParam !== flow) {
      setFlow(`${searchParam.toUpperCase()}_FLOW` as IntegrationsModal);
    }
  }, []);

  // Flow is showing when the modal isShowing is true and there is a populated
  // value of flow.

  if (flow === 'MAILCHIMP_FLOW') return <MailchimpFlow />;
  if (flow === 'MAILCHIMP_DETAILS') return <MailchimpDetails />;
  if (flow === 'STRIPE_DETAILS') return <StripeDetails />;

  return null;
};

export default () => {
  const { loading } = useFetchIntegrations();

  return (
    <Integrations.Provider>
      <MainHeader loading={loading} title="Integrations" />

      <MainContent loading={loading}>
        <IntegrationsCardContainer />
      </MainContent>

      <IntegrationModal />
    </Integrations.Provider>
  );
};
