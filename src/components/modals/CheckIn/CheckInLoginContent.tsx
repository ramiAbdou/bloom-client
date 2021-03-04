import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import URLBuilder from 'util/URLBuilder';

import Button from '@atoms/Button/Button';
import ErrorMessage from '@atoms/ErrorMessage';
import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import GoogleLogo from '@images/google.svg';
import Form from '@organisms/Form/Form';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMember } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { APP, CookieType, QuestionCategory, ShowProps } from '@util/constants';
import { CheckInError } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';
import useInitCheckInError from './useInitCheckInError';
import useSendLoginLink from './useSendLoginLink';

const CheckInGoogleButton: React.FC = () => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const { pathname } = useLocation();

  const { url } = new URLBuilder('https://accounts.google.com/o/oauth2/v2/auth')
    .addParam('scope', 'https://www.googleapis.com/auth/userinfo.email')
    .addParam('response_type', 'code')
    .addParam('redirect_uri', `${APP.SERVER_URL}/google/auth`)
    .addParam('client_id', process.env.GOOGLE_CLIENT_ID)
    .addParam(
      'state',
      communityId && JSON.stringify({ communityId, pathname })
    );

  return (
    <Button
      fill
      large
      className="mo-check-in-google"
      href={url}
      openTab={false}
    >
      <GoogleLogo style={{ height: 20, width: 20 }} />
      Sign In with Google
    </Button>
  );
};

const LoginCardGoogleContainer: React.FC = React.memo(() => {
  const owner: IMember = useStoreState(({ db }) => {
    return db.byMemberId[db.community?.owner];
  });

  // We store the error code in a cookie.
  const error = Cookies.get(CookieType.LOGIN_ERROR) as CheckInError;
  const message = getCheckInErrorMessage({ error, owner });

  const loading = useInitCheckInError();

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again. We set a timeout to ensure that even if the component
  // re-renders, the message still appears.
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (error) Cookies.remove(CookieType.LOGIN_ERROR);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Show show={!loading}>
      <div>
        <CheckInGoogleButton />
        <ErrorMessage marginBottom={0}>{message}</ErrorMessage>
      </div>
    </Show>
  );
});

const LoginCardEmailForm: React.FC = () => {
  const sendLoginLink = useSendLoginLink();

  return (
    <Form onSubmit={sendLoginLink}>
      <FormShortText
        category={QuestionCategory.EMAIL}
        description="Or continue with your email address to receive a login link."
        placeholder="Email"
      />

      <FormSubmitButton loadingText="Sending...">
        Send Login Link
      </FormSubmitButton>
    </Form>
  );
};

const CheckInLoginContent: React.FC<ShowProps> = ({ show }) => {
  return (
    <Show show={show}>
      <LoginCardGoogleContainer />
      <Separator margin={24} />
      <LoginCardEmailForm />
    </Show>
  );
};

export default CheckInLoginContent;
