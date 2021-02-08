import React from 'react';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
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
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  return (
    <MainContent>
      <IntegrationsHeader loading={loading} />
      {!loading && <IntegrationsCardContainer />}
    </MainContent>
  );
};

const IntegrationsModals: React.FC = () => (
  <>
    <IntegrationsModal />
  </>
);

const Integrations: React.FC = () => (
  <IntegrationsStore.Provider>
    <IntegrationsContent />
    <IntegrationsModals />
  </IntegrationsStore.Provider>
);

export default Integrations;
