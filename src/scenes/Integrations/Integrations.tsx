import deepequal from 'fast-deep-equal';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import URLBuilder from 'util/URLBuilder';

import { APP, isProduction } from '@constants';
import { IIntegrations } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import MailchimpDetails from './components/ExpandedDetails/MailchimpDetails';
import StripeDetails from './components/ExpandedDetails/StripeDetails';
import Header from './components/Header';
import IntegrationCard, {
  IntegrationCardProps
} from './components/IntegrationCard';
import MailchimpFlow from './components/MailchimpFlow/MailchimpFlow';
import mailchimp from './images/mailchimp.png';
import stripe from './images/stripe.png';
import zapier from './images/zapier.png';
import { GET_INTEGRATIONS } from './Integrations.gql';
import Integrations, { IntegrationsModal } from './Integrations.store';

const MAILCHIMP_BASE_URI = isProduction
  ? APP.SERVER_URL
  : 'http://127.0.0.1:8080';

const IntegrationModal = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = Integrations.useStoreState((store) => store.flow);
  const setFlow = Integrations.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    if (searchParam && searchParam !== flow) {
      setFlow(`${searchParam.toUpperCase()}_FLOW` as IntegrationsModal);
    }
  }, []);

  // Flow is showing when the modal isShowing is true and there is a populated
  // value of flow.

  if (flow === 'MAILCHIMP_FLOW') return <MailchimpFlow />;
  if (flow === 'MAILCHIMP_DETAILS') return <MailchimpDetails />;
  if (flow === 'STRIPE_DETAILS') return <StripeDetails />;

  return null;
};

// Responsible for fetching and supplying all the data to the children card
// components to process and render.
const Cards = () => {
  const encodedUrlName = useStoreState(({ db }) => db.community.encodedUrlName);

  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    stripeAccountId
  } = useStoreState(({ db }) => db.integrations, deepequal) as IIntegrations;

  const integrationData: IntegrationCardProps[] = [
    // ## MAILCHIMP
    {
      completed: !!mailchimpListId,
      description: `Quickly add every new member of the community to your
      Mailchimp listserv.`,
      href:
        !isMailchimpAuthenticated &&
        new URLBuilder('https://login.mailchimp.com/oauth2/authorize')
          .addParam('response_type', 'code')
          .addParam('client_id', process.env.MAILCHIMP_CLIENT_ID)
          .addParam('redirect_uri', `${MAILCHIMP_BASE_URI}/mailchimp/auth`)
          .addParam('state', encodedUrlName).url,
      logo: mailchimp,
      name: 'Mailchimp'
    },

    // ## STRIPE
    {
      completed: !!stripeAccountId,
      description: 'Collect monthly or yearly dues payments from your members.',
      href: new URLBuilder('https://connect.stripe.com/oauth/authorize')
        .addParam('response_type', 'code')
        .addParam(
          'client_id',
          isProduction
            ? process.env.STRIPE_CLIENT_ID
            : process.env.STRIPE_TEST_CLIENT_ID
        )
        .addParam('scope', 'read_write')
        .addParam(
          'redirect_uri',
          isProduction
            ? `${APP.SERVER_URL}/stripe/auth`
            : `${APP.NGROK_SERVER_URL}/stripe/auth`
        )
        .addParam('state', encodedUrlName).url,
      logo: stripe,
      name: 'Stripe'
    },

    // ## ZAPIER
    {
      description: 'For just about any other integration you want.',
      href: 'https://zapier.com/',
      logo: zapier,
      name: 'Zapier'
    }
  ];

  return (
    <div className="s-integrations-card-ctr">
      {integrationData.map((props: IntegrationCardProps) => (
        <IntegrationCard key={props.name} {...props} />
      ))}
    </div>
  );
};

export default () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const { data, loading } = useQuery(GET_INTEGRATIONS);

  useEffect(() => {
    if (data?.getIntegrations) {
      mergeEntities({
        data: { ...data.getIntegrations },
        schema: Schema.COMMUNITY
      });
    }
  }, [data]);

  return (
    <Integrations.Provider>
      <Header loading={loading} />
      <div className="s-home-content">{!loading && <Cards />}</div>
      <IntegrationModal />
    </Integrations.Provider>
  );
};
