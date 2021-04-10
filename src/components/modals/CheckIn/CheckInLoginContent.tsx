import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@components/atoms/Button/Button';
import ErrorMessage from '@components/atoms/ErrorMessage';
import Separator from '@components/atoms/Separator';
import Show from '@components/containers/Show';
import GoogleLogo from '@components/images/google.svg';
import Form from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IMember, MemberRole } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { APP, QuestionCategory, ShowProps } from '@util/constants';
import { ErrorContext, ErrorType } from '@util/constants.errors';
import { buildUrl } from '@util/util';
import { getCheckInErrorMessage } from './CheckIn.util';
import useSendLoginLink from './useSendLoginLink';

const CheckInGoogleButton: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const { pathname } = useLocation();

  const url: string = buildUrl('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${APP.SERVER_URL}/google/auth`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    state: communityId ? JSON.stringify({ communityId, pathname }) : ''
  });

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
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: owner, loading } = useFindOne(IMember, {
    fields: ['email', 'firstName', 'lastName'],
    where: { communityId, role: MemberRole.OWNER }
  });

  // We store the error code in a cookie.
  const error = Cookies.get(ErrorContext.LOGIN_ERROR) as ErrorType;
  const message = getCheckInErrorMessage({ error, owner });

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again. We set a timeout to ensure that even if the component
  // re-renders, the message still appears.
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (error) Cookies.remove(ErrorContext.LOGIN_ERROR);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  if (loading) return null;

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

const CheckInLoginContent: React.FC<ShowProps> = ({ show }) => (
  <Show show={show}>
    <LoginCardGoogleContainer />
    <Separator margin={24} />
    <LoginCardEmailForm />
  </Show>
);

export default CheckInLoginContent;
