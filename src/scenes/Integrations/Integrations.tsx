import React from 'react';

import { LoadingProps } from '@constants';
import { MainContent, MainHeader } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import LoadingStore from '@store/Loading.store';
import { Schema } from '@store/schema';
import { GET_INTEGRATIONS } from './Integrations.gql';
import IntegrationsStore from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';
import IntegrationsModal from './IntegrationsModal';

const IntegrationsHeader: React.FC<LoadingProps> = ({ loading }) => {
  return <MainHeader loading={loading} title="Integrations" />;
};

const IntegrationsContent: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={IntegrationsHeader} loading={loading}>
      <IntegrationsCardContainer />
    </MainContent>
  );
};

const IntegrationsModals: React.FC = () => (
  <>
    <IntegrationsModal />
  </>
);

const Integrations: React.FC = () => (
  <LoadingStore.Provider>
    <IntegrationsStore.Provider>
      <IntegrationsContent />
      <IntegrationsModals />
    </IntegrationsStore.Provider>
  </LoadingStore.Provider>
);

export default Integrations;
