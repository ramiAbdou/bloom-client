import URLBuilder from 'util/URLBuilder';

import { ICommunityIntegrations } from '@store/Db/entities';
import {
  APP,
  isDevelopment,
  isProduction,
  UrlNameProps
} from '@util/constants';
import mailchimp from './images/mailchimp.png';
import slack from './images/slack.png';
import stripe from './images/stripe.png';
import zapier from './images/zapier.png';
import { IntegrationsDetailsData } from './Integrations.types';

const MAILCHIMP_BASE_URI = !isDevelopment
  ? APP.SERVER_URL
  : 'http://127.0.0.1:8080';

interface BuildIntegrationDataProps
  extends Pick<
      ICommunityIntegrations,
      'isMailchimpAuthenticated' | 'mailchimpListId' | 'stripeAccountId'
    >,
    UrlNameProps {}

/**
 * Returns an array of data points per integration (ie: Mailchimp, Stripe,
 * Zapier). Contains informations about the OAuth connection URL, logo
 * and description.
 */
export const buildIntegrationData = ({
  urlName,
  isMailchimpAuthenticated,
  mailchimpListId,
  stripeAccountId
}: BuildIntegrationDataProps): IntegrationsDetailsData[] => {
  return [
    // ## SLACK
    {
      connected: false,
      description:
        'Paywall your Slack community and see in-depth engagement analytics.',
      href: new URLBuilder('https://connect.stripe.com/oauth/authorize')
        .addParam('response_type', 'code')
        .addParam('client_id', null)
        .addParam('scope', 'read_write')
        .addParam(
          'redirect_uri',
          isProduction
            ? `${APP.SERVER_URL}/stripe/auth`
            : `${APP.NGROK_SERVER_URL}/stripe/auth`
        )
        .addParam('state', urlName).url,
      logo: slack,
      name: 'Slack'
    },

    // ## MAILCHIMP
    {
      connected: !!mailchimpListId,
      description: `Quickly add every new member of the community to your
      Mailchimp listserv.`,
      href:
        !isMailchimpAuthenticated &&
        new URLBuilder('https://login.mailchimp.com/oauth2/authorize')
          .addParam('response_type', 'code')
          .addParam('client_id', process.env.MAILCHIMP_CLIENT_ID)
          .addParam('redirect_uri', `${MAILCHIMP_BASE_URI}/mailchimp/auth`)
          .addParam('state', urlName).url,
      logo: mailchimp,
      name: 'Mailchimp'
    },

    // ## STRIPE
    {
      connected: !!stripeAccountId,
      description: 'Collect monthly or yearly dues payments from your members.',
      href: new URLBuilder('https://connect.stripe.com/oauth/authorize')
        .addParam('response_type', 'code')
        .addParam('client_id', process.env.STRIPE_CLIENT_ID)
        .addParam('scope', 'read_write')
        .addParam(
          'redirect_uri',
          isProduction
            ? `${APP.SERVER_URL}/stripe/auth`
            : `${APP.NGROK_SERVER_URL}/stripe/auth`
        )
        .addParam('state', urlName).url,
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
};
