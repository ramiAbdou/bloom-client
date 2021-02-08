import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';

export type IntegrationCardProps = {
  connected?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationsCardButton: React.FC<IntegrationCardProps> = ({
  connected,
  href,
  logo,
  name
}) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // If the href is present, the user hasn't authenticated anything. Otherwise,
  // it means the user authenticated (logged in), but didn't finish the
  // respective process (ie: choosing a Mailchimp Audience ID).
  const buttonText = href ? 'Connect +' : 'Finish Connecting +';

  const onSeeDetails = () => {
    showModal({
      id: ModalType.INTEGRATIONS_DETAILS,
      metadata: { logo, name }
    });
  };

  if (connected) {
    return (
      <Button fill secondary onClick={onSeeDetails}>
        See Details
      </Button>
    );
  }

  const onClick = () => {
    if (name === 'Mailchimp') showModal({ id: ModalType.MAILCHIMP_FLOW });
  };

  const aProps = href ? { href, rel: 'noreferrer', target: '_blank' } : {};

  return (
    <a onClick={onClick} {...aProps}>
      <Button fill secondary>
        {buttonText}
      </Button>
    </a>
  );
};

export default IntegrationsCardButton;
