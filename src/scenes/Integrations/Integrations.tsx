/**
 * @fileoverview Scene: Integrations
 * @author Rami Abdou
 */

import './Integrations.scss';

import React from 'react';

import { APP, isProduction } from '@constants';
import { useStoreState } from '@store/Store';
import URLBuilder from '@util/URLBuilder';
import IntegrationCard, {
  IntegrationCardProps
} from './components/IntegrationCard/IntegrationCard';
import MailchimpFlow from './components/OnboardingFlow/MailchimpFlow';

const OnboardingFlow = () => {
  const flow = new URLSearchParams(window.location.search).get('flow');

  if (flow === 'mailchimp') return <MailchimpFlow />;

  return null;
};

export default () => {
  const state = useStoreState(({ community }) => community.encodedUrlName);
  const BASE_URI = isProduction ? APP.SERVER_URL : 'http://127.0.0.1:8080';

  const integrationData: IntegrationCardProps[] = [
    {
      description: `Quickly add every new member of the community to your Mailchimp
    listserv.`,
      href: new URLBuilder('https://login.mailchimp.com/oauth2/authorize')
        .addParam('response_type', 'code')
        .addParam('client_id', process.env.MAILCHIMP_CLIENT_ID)
        .addParam('redirect_uri', `${BASE_URI}/mailchimp/auth`)
        .addParam('state', state).url,
      name: 'Mailchimp'
    },
    {
      description: 'Collect monthly or yearly dues payments from your members.',
      href: 'https://stripe.com/',
      name: 'Stripe'
    },
    {
      description: 'Host Zoom events with your account in 1-click.',
      href: 'https://zoom.com/',
      name: 'Zoom'
    },
    {
      description: 'For just about any other integration you want.',
      href: 'https://zapier.com/',
      name: 'Zapier'
    }
  ];

  return (
    <div className="s-integrations">
      <div className="s-home-header">
        <h1 className="s-home-header-title">Integrations</h1>
      </div>

      <div className="s-integrations-card-ctr">
        {integrationData.map((data: IntegrationCardProps) => (
          <IntegrationCard key={data.name} {...data} />
        ))}
      </div>

      <OnboardingFlow />
    </div>
  );
};
