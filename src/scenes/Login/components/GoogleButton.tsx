/**
 * @fileoverview Component: GoogleButton
 * @author Rami Abdou
 */

import React from 'react';

import { APP } from '@constants';
import URLBuilder from '@util/URLBuilder';

const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
  .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
  .addParam('client_id', process.env.GOOGLE_CLIENT_ID);

export default () => (
  <button>
    <a href={url}>Google Login</a>
  </button>
);
