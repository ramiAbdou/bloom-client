import Cookies from 'js-cookie';
import React from 'react';

import Button from '@components/Button/Button';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { APP, LoginError } from '@constants';
import URLBuilder from '@util/URLBuilder';
import { makeClass } from '@util/util';
import google from '../../images/google.svg';

/**
 * UTILITY: Returns the login error message based on the cookie.
 */
const getLoginErrorMessage = (error: LoginError) => {
  if (error === 'USER_NOT_FOUND')
    return `You must apply and be accepted into a commmunity before logging in.`;
  if (error === 'APPLICATION_REJECTED')
    return `You must be accepted into a commmunity before logging in.`;
  if (error === 'APPLICATION_PENDING')
    return `You have pending membership applications. Once they are accepted, you will be able to log in.`;

  return error;
};

const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
  .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
  .addParam('client_id', process.env.GOOGLE_CLIENT_ID);

const GoogleButton = () => (
  <Button fill large href={url}>
    <img alt="Google Icon" src={google} />
    Sign In with Google
  </Button>
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
      {!!message && <ErrorMessage marginBottom={0} message={message} />}
    </div>
  );
};
