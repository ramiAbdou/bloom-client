import Cookies from 'js-cookie';
import React from 'react';
import { useLocation } from 'react-router-dom';
import URLBuilder from 'util/URLBuilder';

import ErrorMessage from '@atoms/ErrorMessage';
import Separator from '@atoms/Separator';
import { APP, ShowProps } from '@constants';
import GoogleLogo from '@images/google.svg';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { cx } from '@util/util';
import { getCheckInErrorMessage, LoginError } from './CheckIn.util';

const CheckInGoogleButton: React.FC = () => {
  const { pathname } = useLocation();

  const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
    .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
    .addParam('response_type', 'code')
    .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
    .addParam('client_id', process.env.GOOGLE_CLIENT_ID)
    .addParam('state', pathname);

  return (
    <a href={url}>
      <GoogleLogo style={{ height: 20, width: 20 }} />
      Sign In with Google
    </a>
  );
};

const LoginCardGoogleContainer: React.FC = () => {
  // We store the error code in a cookie.
  const cookie = Cookies.get('LOGIN_ERROR') as LoginError;
  const message = getCheckInErrorMessage(cookie);

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again.
  if (cookie) Cookies.remove('LOGIN_ERROR');

  const css = cx('s-login-google', { 's-login-google--sm': message });

  return (
    <div className={css}>
      <CheckInGoogleButton />
      <ErrorMessage marginBottom={0}>{message}</ErrorMessage>
    </div>
  );
};

const LoginCardEmailForm: React.FC = () => {
  // const sendLoginLink = useSendLoginLink();
  // onSubmit={sendLoginLink}
  return (
    <Form className="s-login-email-form">
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

const CheckInLoginContent: React.FC<ShowProps> = ({ show }) => {
  if (show === false) return null;

  return (
    <>
      <LoginCardGoogleContainer />
      <Separator margin={24} />
      <LoginCardEmailForm />
    </>
  );
};

export default CheckInLoginContent;