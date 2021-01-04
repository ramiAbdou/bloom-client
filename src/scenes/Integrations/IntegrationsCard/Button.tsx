import React, { memo } from 'react';

import Button from '@atoms/Button';
import IntegrationsStore, {
  IntegrationsModalType
} from '../Integrations.store';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const IntegrationCardButton = memo(
  ({ completed, href, name }: Partial<IntegrationCardProps>) => {
    const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

    // onClick only executes if href isn't populated, per the Button component.
    const onOpenFlow = () =>
      setFlow(`${name.toUpperCase()}_FORM` as IntegrationsModalType);

    // If the href is present, the user hasn't authenticated anything. Otherwise,
    // it means the user authenticated (logged in), but didn't finish the
    // respective process (ie: choosing a Mailchimp Audience ID).
    const buttonText = href ? 'Connect +' : 'Finish Connecting +';

    const onSeeDetails = () =>
      setFlow(`${name.toUpperCase()}_DETAILS` as IntegrationsModalType);

    if (completed) {
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
