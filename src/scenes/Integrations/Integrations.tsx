import MainHeader from 'core/templates/Main/Header';
import React, { useEffect } from 'react';

import Loading from '@store/Loading.store';
import MainContent from '@templates/Main/Content';
import MailchimpDetails from './components/ExpandedDetails/MailchimpDetails';
import StripeDetails from './components/ExpandedDetails/StripeDetails';
import MailchimpFlow from './components/MailchimpModal/MailchimpModal';
import useFetchIntegrations from './useFetchIntegrations';
import IntegrationsStore, { IntegrationsModal } from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';

const IntegrationModal = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

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

const IntegrationsContent: React.FC = () => {
  useFetchIntegrations();

  return (
    <>
      <MainHeader title="Integrations" />

      <MainContent>
        <IntegrationsCardContainer />
      </MainContent>

      <IntegrationModal />
    </>
  );
};

const Integrations: React.FC = () => {
  return (
    <Loading.Provider>
      <IntegrationsStore.Provider>
        <IntegrationsContent />
      </IntegrationsStore.Provider>
    </Loading.Provider>
  );
};

export default Integrations;
