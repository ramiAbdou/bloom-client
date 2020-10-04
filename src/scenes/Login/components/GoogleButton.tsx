/**
 * @fileoverview Component: GoogleButton
 * @author Rami Abdou
 */

import React from 'react';

import { GOOGLE } from '@constants';

const GOOGLE_AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?scope=https://www.googleapis.com/auth/userinfo.email` +
  '&prompt=consent' +
  `&access_type=offline` +
  `&response_type=code` +
  `&redirect_uri=${GOOGLE.REDIRECT_URI}` +
  `&client_id=${GOOGLE.CLIENT_ID}`;

export default () => (
  <button>
    <a href={GOOGLE_AUTH_URL}>Google Login</a>
  </button>
);
