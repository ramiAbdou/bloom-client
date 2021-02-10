import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader from '@containers/Main/MainHeader';
import { useStoreActions } from '@store/Store';
import IntegrationsCardContainer from './IntegrationsCardContainer';

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
      <IntegrationsCardContainer />
    </MainContent>
  );
};

export default Integrations;
