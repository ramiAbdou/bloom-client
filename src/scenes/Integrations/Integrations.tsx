import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import LoadingStore from '@store/Loading.store';
import IntegrationsStore from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';
import IntegrationsModal from './IntegrationsModal';
import useFetchIntegrations from './useFetchIntegrations';

const IntegrationsContent: React.FC = () => {
  useFetchIntegrations();

  return (
    <>
      <MainHeader title="Integrations" />

      <MainContent>
        <IntegrationsCardContainer />
      </MainContent>

      <IntegrationsModal />
    </>
  );
};

const Integrations: React.FC = () => (
  <LoadingStore.Provider>
    <IntegrationsStore.Provider>
      <IntegrationsContent />
    </IntegrationsStore.Provider>
  </LoadingStore.Provider>
);

export default Integrations;
