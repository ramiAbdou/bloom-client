import { ICommunityIntegrations } from '@util/db.entities';
import {
  APP,
  isDevelopment,
  isProduction,
  isStage,
  UrlNameProps
} from '@util/constants';
import { buildUrl } from '@util/util';
import mailchimp from './images/mailchimp.png';
import stripe from './images/stripe.png';
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
}: BuildIntegrationDataProps): IntegrationsDetailsData[] => [
  // ## MAILCHIMP
  {
    connected: !!mailchimpListId,
    description: `Quickly add every new member of the community to your
      Mailchimp listserv.`,
    href:
      !isMailchimpAuthenticated &&
      buildUrl('https://login.mailchimp.com/oauth2/authorize', {
        client_id: process.env.MAILCHIMP_CLIENT_ID,
        redirect_uri: `${MAILCHIMP_BASE_URI}/mailchimp/auth`,
        response_type: 'code',
        state: urlName
      }),
    logo: mailchimp,
    name: 'Mailchimp'
  },

  // ## STRIPE
  {
    connected: !!stripeAccountId,
    description: 'Collect monthly or yearly dues payments from your members.',
    href: buildUrl('https://connect.stripe.com/oauth/authorize', {
      client_id: process.env.STRIPE_CLIENT_ID,
      redirect_uri:
        isProduction || isStage
          ? `${APP.SERVER_URL}/stripe/auth`
          : `${APP.NGROK_SERVER_URL}/stripe/auth`,
      response_type: 'code',
      scope: 'read_write',
      state: urlName
    }),
    logo: stripe,
    name: 'Stripe'
  }
];
