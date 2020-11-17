/**
 * @fileoverview Component: IntegrationCard
 * @author Rami Abdou
 */

import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import mailchimp from '../../images/mailchimp.png';
import stripe from '../../images/stripe.png';
import zapier from '../../images/zapier.png';
import zoom from '../../images/zoom.svg';

type IntegrationCardProps = { name: string; description: string; href: string };

export default ({ name, description, href }: IntegrationCardProps) => {
  let logo: any;

  if (name === 'Mailchimp') logo = mailchimp;
  else if (name === 'Stripe') logo = stripe;
  else if (name === 'Zoom') logo = zoom;
  else if (name === 'Zapier') logo = zapier;

  return (
    <div className="s-integrations-card">
      <img alt="Integration Logo" src={logo} />
      <h3>{name}</h3>
      <p>{description}</p>

      <OutlineButton green href={href} title="Connect +" />
    </div>
  );
};
