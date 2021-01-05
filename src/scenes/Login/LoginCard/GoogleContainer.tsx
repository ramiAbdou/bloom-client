import Cookies from 'js-cookie';
import React from 'react';
import URLBuilder from 'util/URLBuilder';

import ErrorMessage from '@components/Misc/ErrorMessage';
import { APP } from '@constants';
import { makeClass } from '@util/util';
import google from '../images/google.svg';
import { LoginError } from '../Login.store';
import { getLoginErrorMessage } from '../Login.util';

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
  // We store the error code in a cookie.
  const cookie = Cookies.get('LOGIN_ERROR') as LoginError;
  const message = getLoginErrorMessage(cookie);

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again.
  if (cookie) Cookies.remove('LOGIN_ERROR');

  const css = makeClass(['s-login-google', [message, 's-login-google--sm']]);

  return (
    <div className={css}>
      <GoogleButton />
      <ErrorMessage marginBottom={0} message={message} />
    </div>
  );
};
