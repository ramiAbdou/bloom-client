/**
 * @fileoverview Component: ZoomButton
 * @author Rami Abdou
 */

import React from 'react';

import { APP } from '@constants';

const ZOOM_AUTH_URL =
  `https://zoom.us/oauth/authorize` +
  `?response_type=code` +
  `&redirect_uri=${`${APP.SERVER_URL}/zoom/auth`}` +
  `&client_id=${process.env.ZOOM_CLIENT_ID}` +
  `&state=colorstack`;

export default () => (
  <button>
    <a href={ZOOM_AUTH_URL}>Authenticate Zoom Account</a>
  </button>
);
