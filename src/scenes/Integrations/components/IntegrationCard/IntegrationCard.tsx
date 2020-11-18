/**
 * @fileoverview Component: IntegrationCard
 * @author Rami Abdou
 */

import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import { useStoreActions } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import stripe from '../../images/stripe.png';
import zapier from '../../images/zapier.png';
import zoom from '../../images/zoom.svg';
import MailchimpFlow from '../OnboardingFlow/MailchimpFlow';

export type IntegrationCardProps = {
  description: string;
  isCompleted?: boolean;
  name: string;
  href: string;
};

export default ({
  isCompleted,
  name,
  description,
  href
}: IntegrationCardProps) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (isCompleted) return null;

  let logo: any;
  if (name === 'Mailchimp') logo = mailchimp;
  else if (name === 'Stripe') logo = stripe;
  else if (name === 'Zoom') logo = zoom;
  else if (name === 'Zapier') logo = zapier;

  // onClick only executes if href isn't populated, per the Button component.
  const onClick = () => {
    if (name === 'Mailchimp')
      showModal({ id: 'MAILCHIMP_FLOW', screens: [<MailchimpFlow />] });
  };

  // If the href is present, the user hasn't authenticated anything. Otherwise,
  // it means the user authenticated (logged in), but didn't finish the
  // respective process (ie: choosing a Mailchimp Audience ID).
  const buttonText = href ? 'Connect +' : 'Finish Connecting +';

  return (
    <div className="s-integrations-card">
      <img alt="Integration Logo" className="s-integrations-icon" src={logo} />
      <h3>{name}</h3>
      <p>{description}</p>

      <OutlineButton href={href} title={buttonText} onClick={onClick} />
    </div>
  );
};
