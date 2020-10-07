/**
 * @fileoverview Component: GoogleButton
 * @author Rami Abdou
 */

import React from 'react';

import { APP } from '@constants';

const GOOGLE_AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?scope=https://www.googleapis.com/auth/userinfo.email` +
  `&response_type=code` +
  `&redirect_uri=${`${APP.SERVER_URL}/google/auth`}` +
  `&client_id=${process.env.GOOGLE_CLIENT_ID}`;

export default () => (
  <button>
    <a href={GOOGLE_AUTH_URL}>Google Login</a>
  </button>
);
