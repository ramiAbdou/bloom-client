import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import { IntegrationsDetailsData } from './Integrations.types';

const IntegrationsCardSeeDetailsButton: React.FC<IntegrationsDetailsData> = ({
  connected,
  logo,
  name
}) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.INTEGRATIONS_DETAILS, metadata: { logo, name } });
  };

  return (
    <Button
      fill
      secondary
      className="mt-auto"
      show={connected}
      onClick={onClick}
    >
      See Details
    </Button>
  );
};

const IntegrationsCardConnectButton: React.FC<IntegrationsDetailsData> = ({
  href,
  name
}) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // If the href is present, the user hasn't authenticated anything. Otherwise,
  // it means the user authenticated (logged in), but didn't finish the
  // respective process (ie: choosing a Mailchimp Audience ID).

  const onClick = () => {
    if (name === 'Mailchimp') showModal({ id: ModalType.MAILCHIMP_FLOW });
  };

  const aProps = href ? { href, rel: 'noreferrer', target: '_blank' } : {};

  return (
    <a className="mt-auto" onClick={onClick} {...aProps}>
      <Button fill secondary>
        {href ? 'Connect +' : 'Finish Connecting +'}
      </Button>
    </a>
  );
};

const IntegrationsCardButton: React.FC<IntegrationsDetailsData> = ({
  connected,
  ...props
}) => {
  if (connected) return <IntegrationsCardSeeDetailsButton {...props} />;
  return <IntegrationsCardConnectButton {...props} />;
};

export default IntegrationsCardButton;
