import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { GET_INTEGRATIONS } from './Integrations.gql';
import IntegrationsCardContainer from './IntegrationsCardContainer';

const Integrations: React.FC = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    if (searchParam === 'mailchimp') {
      showModal({ id: ModalType.MAILCHIMP_FLOW });
    }
  }, [searchParam]);

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

export default Integrations;
