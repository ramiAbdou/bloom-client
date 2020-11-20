/**
 * @fileoverview Scene: Integrations
 * @author Rami Abdou
 */

import './Integrations.scss';

import { useQuery } from 'graphql-hooks';
import React, { memo, useEffect } from 'react';

import Spinner from '@components/Loader/Spinner';
import { APP, isProduction, LoadingProps } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import URLBuilder from '@util/URLBuilder';
import MailchimpDetails from './components/ExpandedDetails/MailchimpDetails';
import StripeDetails from './components/ExpandedDetails/StripeDetails';
import ZoomDetails from './components/ExpandedDetails/ZoomDetails';
import IntegrationCard, {
  IntegrationCardProps
} from './components/IntegrationCard';
import MailchimpFlow from './components/OnboardingFlow/MailchimpFlow';
import { GET_INTEGRATIONS } from './Integrations.gql';
import Integrations, { IntegrationsModal } from './Integrations.store';

const Header = memo(({ loading }: LoadingProps) => (
  <div className="s-home-header">
    <div>
      <h1 className="s-home-header-title">Integrations</h1>
      {loading && <Spinner dark />}
    </div>
  </div>
));

const IntegrationModal = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = Integrations.useStoreState((store) => store.flow);
  const setFlow = Integrations.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    if (searchParam && searchParam !== flow)
      setFlow(`${searchParam.toUpperCase()}_FLOW` as IntegrationsModal);
  }, []);

  // Flow is showing when the modal isShowing is true and there is a populated
  // value of the Integrations store flow.

  if (flow === 'MAILCHIMP_FLOW') return <MailchimpFlow />;
  if (flow === 'MAILCHIMP_DETAILS') return <MailchimpDetails />;
  if (flow === 'STRIPE_DETAILS') return <StripeDetails />;
  if (flow === 'ZOOM_DETAILS') return <ZoomDetails />;

  return null;
};

const Cards = () => {
  const state = useStoreState(({ community }) => community.encodedUrlName);

  const isMailchimpAuthenticated = useStoreState(
    ({ integrations }) => integrations?.isMailchimpAuthenticated
  );

  const isMailchimpComplete = useStoreState(
    ({ integrations }) => !!integrations?.mailchimpListId
  );

  const isStripeAuthenticated = useStoreState(
    ({ integrations }) => !!integrations?.stripeAccountId
  );

  const isZoomAuthenticated = useStoreState(
    ({ integrations }) => !!integrations?.isZoomAuthenticated
  );

  const BASE_URI = isProduction ? APP.SERVER_URL : 'http://127.0.0.1:8080';

  const integrationData: IntegrationCardProps[] = [
    {
      completed: isMailchimpComplete,
      description: `Quickly add every new member of the community to your Mailchimp
    listserv.`,
      href:
        !isMailchimpAuthenticated &&
        new URLBuilder('https://login.mailchimp.com/oauth2/authorize')
          .addParam('response_type', 'code')
          .addParam('client_id', process.env.MAILCHIMP_CLIENT_ID)
          .addParam('redirect_uri', `${BASE_URI}/mailchimp/auth`)
          .addParam('state', state).url,
      name: 'Mailchimp'
    },
    {
      completed: isStripeAuthenticated,
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
            : 'https://d00220485baf.ngrok.io/stripe/auth'
        )
        .addParam('state', state).url,
      name: 'Stripe'
    },
    {
      completed: isZoomAuthenticated,
      description: 'Host Zoom events with your account in 1-click.',
      href:
        !isZoomAuthenticated &&
        new URLBuilder('https://zoom.us/oauth/authorize')
          .addParam('response_type', 'code')
          .addParam('client_id', process.env.ZOOM_CLIENT_ID)
          .addParam('redirect_uri', `${APP.SERVER_URL}/zoom/auth`)
          .addParam('state', state).url,
      name: 'Zoom'
    },
    {
      description: 'For just about any other integration you want.',
      href: 'https://zapier.com/',
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
  const updateEntities = useStoreActions((store) => store.updateEntities);
  const { data, loading } = useQuery(GET_INTEGRATIONS);

  useEffect(() => {
    if (!data?.getIntegrations) return;

    updateEntities({
      data: { ...data.getIntegrations },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  return (
    <Integrations.Provider>
      <div className="s-integrations">
        <Header loading={loading} />
        {!loading && <Cards />}
        <IntegrationModal />
      </div>
    </Integrations.Provider>
  );
};