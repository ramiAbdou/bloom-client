import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import Loading from '@store/Loading.store';
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
  <Loading.Provider>
    <IntegrationsStore.Provider>
      <IntegrationsContent />
    </IntegrationsStore.Provider>
  </Loading.Provider>
);

export default Integrations;
