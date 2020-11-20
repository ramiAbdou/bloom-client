/**
 * @fileoverview Component: IntegrationCard
 * @author Rami Abdou
 */

import React, { memo } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import IntegrationsStore, { IntegrationsModal } from '../Integrations.store';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

const ActionButton = memo(
  ({ completed, href, name }: Partial<IntegrationCardProps>) => {
    const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

    // onClick only executes if href isn't populated, per the Button component.
    const onOpenFlow = () =>
      setFlow(`${name.toUpperCase()}_FLOW` as IntegrationsModal);

    // If the href is present, the user hasn't authenticated anything. Otherwise,
    // it means the user authenticated (logged in), but didn't finish the
    // respective process (ie: choosing a Mailchimp Audience ID).
    const buttonText = href ? 'Connect +' : 'Finish Connecting +';

    const onSeeDetails = () =>
      setFlow(`${name.toUpperCase()}_DETAILS` as IntegrationsModal);

    if (completed)
      return <PrimaryButton green title="See Details" onClick={onSeeDetails} />;
    return (
      <OutlineButton href={href} title={buttonText} onClick={onOpenFlow} />
    );
  }
);

export default ({
  completed,
  logo,
  name,
  description,
  href
}: IntegrationCardProps) => (
  <div className="s-integrations-card">
    <div className="s-integrations-header">
      <img alt="Company Logo" className="s-integrations-icon" src={logo} />

      {completed && (
        <div className="s-integrations-card-completed">
          <IoIosCheckmarkCircle />
          <p>Connected</p>
        </div>
      )}
    </div>

    <h3>{name}</h3>
    <p>{description}</p>

    <ActionButton completed={completed} href={href} name={name} />
  </div>
);
