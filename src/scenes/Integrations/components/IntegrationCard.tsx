/**
 * @fileoverview Component: IntegrationCard
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import mailchimp from '../images/mailchimp.png';
import stripe from '../images/stripe.png';
import zapier from '../images/zapier.png';
import zoom from '../images/zoom.svg';
import IntegrationsStore, { IntegrationsModal } from '../Integrations.store';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  name: string;
  href: string;
};

export default ({
  completed,
  name,
  description,
  href
}: IntegrationCardProps) => {
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  let logo: any;
  if (name === 'Mailchimp') logo = mailchimp;
  else if (name === 'Stripe') logo = stripe;
  else if (name === 'Zoom') logo = zoom;
  else if (name === 'Zapier') logo = zapier;

  // onClick only executes if href isn't populated, per the Button component.
  const onClick = () =>
    setFlow(`${name.toUpperCase()}_FLOW` as IntegrationsModal);

  // If the href is present, the user hasn't authenticated anything. Otherwise,
  // it means the user authenticated (logged in), but didn't finish the
  // respective process (ie: choosing a Mailchimp Audience ID).
  const buttonText = href ? 'Connect +' : 'Finish Connecting +';

  const onSeeDetails = () =>
    setFlow(`${name.toUpperCase()}_DETAILS` as IntegrationsModal);

  return (
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

      {completed && (
        <PrimaryButton green title="See Details" onClick={onSeeDetails} />
      )}

      {!completed && (
        <OutlineButton href={href} title={buttonText} onClick={onClick} />
      )}
    </div>
  );
};
