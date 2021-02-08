import React, { useEffect } from 'react';

import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import useQuery from '@hooks/useQuery';
import LocalModal from '@organisms/Modal/LocalModal';
import ModalStore from '@organisms/Modal/LocalModal.store';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_INTEGRATIONS } from './Integrations.gql';
import IntegrationsStore, { IntegrationsModalType } from './Integrations.store';
import IntegrationsCardContainer from './IntegrationsCardContainer';

const IntegrationsContent: React.FC = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    if (searchParam && searchParam !== flow) {
      setFlow(`${searchParam.toUpperCase()}_FORM` as IntegrationsModalType);
    }
  }, []);

  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  return (
    <MainContent>
      <MainHeader loading={loading} title="Integrations" />
      {!loading && <IntegrationsCardContainer />}
    </MainContent>
  );
};

const Integrations: React.FC = () => (
  <ModalStore.Provider>
    <IntegrationsStore.Provider>
      <IntegrationsContent />
      <LocalModal />
    </IntegrationsStore.Provider>
  </ModalStore.Provider>
);

export default Integrations;
