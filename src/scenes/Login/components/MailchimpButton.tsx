/**
 * @fileoverview Component: MailchimpButton
 * @author Rami Abdou
 */

import React from 'react';

import { APP, isProduction } from '@constants';
import URLBuilder from '@util/URLBuilder';

const BASE_URI = isProduction ? APP.SERVER_URL : 'http://127.0.0.1:8080';

const { url } = new URLBuilder('https://login.mailchimp.com/oauth2/authorize')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${BASE_URI}/mailchimp/auth`)
  .addParam('client_id', process.env.MAILCHIMP_CLIENT_ID)
  .addParam('state', 'colorstack');

export default () => (
  <button>
    <a href={url}>Mailchimp Login</a>
  </button>
);
