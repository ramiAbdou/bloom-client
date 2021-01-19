import Cookies from 'js-cookie';
import React from 'react';
import URLBuilder from 'util/URLBuilder';
import validator from 'validator';

import ErrorMessage from '@atoms/ErrorMessage';
import Separator from '@atoms/Separator';
import { APP } from '@constants';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { cx } from '@util/util';
import BloomLogo from './BloomLogo';
import google from './images/google.svg';
import network from './images/network.svg';
import { LoginError } from './Login.types';
import { getLoginErrorMessage } from './Login.util';
import useSendLoginLink from './useSendLoginLink';

const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
  .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
  .addParam('response_type', 'code')
  .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
  .addParam('client_id', process.env.GOOGLE_CLIENT_ID);

const LoginCardGoogleButton: React.FC = () => (
  <a href={url}>
    <img alt="Google Icon" src={google} />
    Sign In with Google
  </a>
);

const LoginCardGoogleContainer: React.FC = () => {
  // We store the error code in a cookie.
  const cookie = Cookies.get('LOGIN_ERROR') as LoginError;
  const message = getLoginErrorMessage(cookie);

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again.
  if (cookie) Cookies.remove('LOGIN_ERROR');

  const css = cx('s-login-google', { 's-login-google--sm': message });

  return (
    <div className={css}>
      <LoginCardGoogleButton />
      <ErrorMessage marginBottom={0} message={message} />
    </div>
  );
};

const LoginCardEmailForm: React.FC = () => {
  const sendLoginLink = useSendLoginLink();

  return (
    <Form className="s-login-email-form" onSubmit={sendLoginLink}>
      <FormItem
        required
        category="EMAIL"
        description="Or continue with your email address to receive a login link."
        placeholder="Email"
        type="SHORT_TEXT"
        validate="IS_EMAIL"
      />

      <FormErrorMessage marginTop={0} />

      <FormSubmitButton loadingText="Sending...">
        Send Login Link
      </FormSubmitButton>
    </Form>
  );
};

const LoginCardHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <p>Welcome to</p>
      <BloomLogo multiplier={1.25} />
    </div>

    <img alt="Network Icon" src={network} style={{ height: 151 }} />
  </div>
);

const LoginCard: React.FC = () => (
  <>
    <LoginCardHeader />
    <LoginCardGoogleContainer />
    <Separator />
    <LoginCardEmailForm />
  </>
);

export default LoginCard;
