import URLBuilder from 'util/URLBuilder';

import { APP, isProduction, UrlNameProps } from '@constants';
import { IIntegrations } from '../../core/store/Db/entities';
import mailchimp from './images/mailchimp.png';
import stripe from './images/stripe.png';
import zapier from './images/zapier.png';
import { IntegrationCardProps } from './IntegrationsCard/Button';

const MAILCHIMP_BASE_URI = isProduction
  ? APP.SERVER_URL
  : 'http://127.0.0.1:8080';

interface BuildIntegrationDataProps
  extends Pick<
      IIntegrations,
      'isMailchimpAuthenticated' | 'mailchimpListId' | 'stripeAccountId'
    >,
    UrlNameProps {
  hasPaidMembership: boolean;
}

/**
 * Returns an array of data points per integration (ie: Mailchimp, Stripe,
 * Zapier). Contains informations about the OAuth connection URL, logo
 * and description.
 */
export const buildIntegrationData = ({
  urlName,
  hasPaidMembership,
  isMailchimpAuthenticated,
  mailchimpListId,
  stripeAccountId
}: BuildIntegrationDataProps): IntegrationCardProps[] => {
  const stripeCardProps: IntegrationCardProps[] = hasPaidMembership
    ? [
        {
          connected: !!stripeAccountId,
          description:
            'Collect monthly or yearly dues payments from your members.',
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
            .addParam('state', urlName).url,
          logo: stripe,
          name: 'Stripe'
        }
      ]
    : [];

  return [
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
    ...stripeCardProps,

    // ## ZAPIER
    {
      description: 'For just about any other integration you want.',
      href: 'https://zapier.com/',
      logo: zapier,
      name: 'Zapier'
    }
  ];
};
