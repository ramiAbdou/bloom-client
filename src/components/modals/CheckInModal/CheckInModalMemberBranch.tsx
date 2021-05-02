import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { ApolloError, useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import ErrorMessage from '@components/atoms/ErrorMessage';
import Separator from '@components/atoms/Separator';
import GoogleLogo from '@components/images/google.svg';
import Form from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { APP, QuestionCategory, ShowProps } from '@util/constants';
import { ErrorContext, ErrorType } from '@util/constants.errors';
import { buildUrl, getGraphQLError } from '@util/util';
import useSendLoginLink from './useSendLoginLink';

const CheckInModalMemberBranchGoogleButton: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
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

const CheckInModalMemberBranchGoogleContainer: React.FC = () => {
  // We store the error code in a cookie.
  const error = Cookies.get(ErrorContext.LOGIN_ERROR) as ErrorType;
  const message = getGraphQLError(new ApolloError({ errorMessage: error }));

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again. We set a timeout to ensure that even if the component
  // re-renders, the message still appears.
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (error) Cookies.remove(ErrorContext.LOGIN_ERROR);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div>
      <CheckInModalMemberBranchGoogleButton />
      <ErrorMessage marginBottom={0}>{message}</ErrorMessage>
    </div>
  );
};

const CheckInModalMemberBranchEmailForm: React.FC = () => {
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

const CheckInModalMemberBranch: React.FC<ShowProps> = ({ show }) => {
  if (show === false) return null;

  return (
    <>
      <CheckInModalMemberBranchGoogleContainer />
      <Separator margin={24} />
      <CheckInModalMemberBranchEmailForm />
    </>
  );
};

export default CheckInModalMemberBranch;
