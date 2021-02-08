import React, { memo } from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import IntegrationsStore, {
  IntegrationsModalType
} from '../Integrations.store';

export type IntegrationCardProps = {
  connected?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationCardButton = memo(
  ({ connected, href, logo, name }: Partial<IntegrationCardProps>) => {
    const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);
    const showModal = useStoreActions(({ modal }) => modal.showModal);

    // onClick only executes if href isn't populated, per the Button component.
    const onOpenFlow = () =>
      setFlow(`${name.toUpperCase()}_FORM` as IntegrationsModalType);

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

    const aProps = href ? { href, rel: 'noreferrer', target: '_blank' } : {};

    return (
      <a onClick={onOpenFlow} {...aProps}>
        <Button fill secondary>
          {buttonText}
        </Button>
      </a>
    );
  }
);

export default IntegrationCardButton;
