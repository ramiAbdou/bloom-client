import React from 'react';

import { MainContent, MainHeader } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import { GET_INTEGRATIONS } from './Integrations.gql';
import IntegrationsStore from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';
import IntegrationsModal from './IntegrationsModal';

const IntegrationsContent: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY
  });

  return (
    <>
      <MainHeader title="Integrations" />

      <MainContent loading={loading}>
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
