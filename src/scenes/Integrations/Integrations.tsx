import React, { useEffect } from 'react';

import MainContent from '@components/containers/Main/MainContent';
import MainHeader from '@components/containers/Main/MainHeader';
import Scene from '@components/containers/Scene';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import IntegrationsConnectedList from './IntegrationsConnectedList';
import IntegrationsDisconnectedList from './IntegrationsDisconnectedList';

const Integrations: React.FC = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');

  useEffect(() => {
    if (searchParam === 'mailchimp') {
      modalVar({ id: ModalType.MAILCHIMP_FLOW });
    }
  }, [searchParam]);

  return (
    <Scene>
      <MainContent>
        <MainHeader loading={false} title="Integrations" />
        <IntegrationsConnectedList />
        <IntegrationsDisconnectedList />
      </MainContent>
    </Scene>
  );
};

export default Integrations;
