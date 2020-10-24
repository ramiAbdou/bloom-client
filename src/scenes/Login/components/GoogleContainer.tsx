/**
 * @fileoverview Component: GoogleButton
 * @author Rami Abdou
 */

import Cookies from 'js-cookie';
import React from 'react';

import ErrorMessage from '@components/Misc/ErrorMessage';
import { APP } from '@constants';
import CSSModifier from '@util/CSSModifier';
import URLBuilder from '@util/URLBuilder';
import { google } from '../images';

const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
  .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
  .addParam('client_id', process.env.GOOGLE_CLIENT_ID);

const GoogleButton = () => (
  <a href={url}>
    <img alt="Google Icon" src={google} />
    Sign In with Google
  </a>
);

export default () => {
  const cookie = Cookies.get('LOGIN_ERROR');
  if (cookie) Cookies.remove('LOGIN_ERROR');

  const message =
    cookie === 'USER_NOT_FOUND'
      ? 'You must be accepted into a community before attempting to login.'
      : '';

  const { css } = new CSSModifier()
    .class('s-login-google')
    .addClass(!!message, 's-login-google--sm');

  return (
    <div className={css}>
      <GoogleButton />
      {!!message && <ErrorMessage message={message} />}
    </div>
  );
};
