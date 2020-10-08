/**
 * @fileoverview Component: ZoomButton
 * @author Rami Abdou
 */

import React from 'react';

import { APP } from '@constants';
import URLBuilder from '@util/URLBuilder';

const { url } = new URLBuilder('https://zoom.us/oauth/authorize')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${APP.SERVER_URL}/zoom/auth`)
  .addParam('client_id', process.env.ZOOM_CLIENT_ID)
  .addParam('state', 'colorstack');

export default () => (
  <button>
    <a href={url}>Authenticate Zoom Account</a>
  </button>
);
