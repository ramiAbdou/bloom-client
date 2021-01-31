import deline from 'deline';
import Cookies from 'js-cookie';
import React from 'react';
import { useLocation } from 'react-router-dom';
import URLBuilder from 'util/URLBuilder';

import Button from '@atoms/Button/Button';
import ErrorMessage from '@atoms/ErrorMessage';
import Separator from '@atoms/Separator';
import { APP, CookieType, ShowProps } from '@constants';
import GoogleLogo from '@images/google.svg';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import FormShortText from '../../organisms/Form/FormShortText';
import { CheckInError } from './CheckIn.types';
import { getCheckInErrorMessage } from './CheckIn.util';
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
  const owner: IUser = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    const member: IMember = byMemberId[db.community?.owner];
    return byUserId[member?.user];
  });

  // We store the error code in a cookie.
  const error = Cookies.get(CookieType.LOGIN_ERROR) as CheckInError;
  const message = getCheckInErrorMessage({ error, owner });

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again.
  if (error) Cookies.remove(CookieType.LOGIN_ERROR);

  return (
    <div>
      <CheckInGoogleButton />
      <ErrorMessage marginBottom={0}>{message}</ErrorMessage>
    </div>
  );
});

const LoginCardEmailForm: React.FC = () => {
  const sendLoginLink = useSendLoginLink();

  return (
    <Form onSubmit={sendLoginLink}>
      <FormShortText
        category="EMAIL"
        description={deline`
          Or continue with your email address to receive a login link.
        `}
        placeholder="Email"
      />

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
