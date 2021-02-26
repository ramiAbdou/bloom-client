import React, { useEffect } from 'react';

import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import IntegrationsConnectedList from './IntegrationsConnectedList';
import IntegrationsDisconnectedList from './IntegrationsDisconnectedList';

const Integrations: React.FC = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    if (searchParam === 'mailchimp') {
      showModal({ id: ModalType.MAILCHIMP_FLOW });
    }
  }, [searchParam]);

  return (
    <MainContent>
      <MainHeader loading={false} title="Integrations" />
      <IntegrationsConnectedList />
      <IntegrationsDisconnectedList />
    </MainContent>
  );
};

export default Integrations;
